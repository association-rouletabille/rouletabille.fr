/**
 * Cloudflare Worker for Roule Ta Bille Instagram feed integration
 *
 * Handles:
 * - GET /api/latest-posts: returns cached Instagram posts
 * - Scheduled cron for post refresh (every 30 minutes)
 * - Scheduled cron for token refresh (weekly)
 */

interface Env {
  INSTAGRAM_KV: KVNamespace;
  ASSETS: Fetcher;
}

interface InstagramPost {
  id: string;
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL';
  timestamp: string;
  media_url?: string;
  permalink: string;
}

interface PostsResponse {
  posts: InstagramPost[];
  cached_at?: string;
  token_refreshed_at?: string;
}

/**
 * Fetch handler: serve API or delegate to static assets
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    // Handle API routes
    if (url.pathname === '/api/latest-posts') {
      // Only allow GET
      if (request.method !== 'GET') {
        return new Response('Method Not Allowed', {
          status: 405,
          headers: { Allow: 'GET' },
        });
      }

      try {
        // Try to match in cache
        const cachedResponse = await caches.default.match(request);

        if (cachedResponse) {
          // Return cached response (headers already include CORS)
          return cachedResponse.clone();
        }

        // Cache miss: return empty posts with descriptive error
        console.error(
          '[RTB Worker] Cache miss for /api/latest-posts. Scheduled post-refresh cron may not have run yet.',
        );

        const emptyResponse: PostsResponse = { posts: [] };
        return new Response(JSON.stringify(emptyResponse), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (error) {
        console.error('[RTB Worker] Fetch handler error:', error);
        const emptyResponse: PostsResponse = { posts: [] };
        return new Response(JSON.stringify(emptyResponse), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // Delegate all other routes to static assets
    return env.ASSETS.fetch(request);
  },

  /**
   * Scheduled handler: refresh posts every 30 minutes
   * Cron pattern: every 30 minutes
   */
  async scheduled(
    event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    // Distinguish between post-refresh (30-min) and token-refresh (weekly) crons
    // Post-refresh runs every 30 minutes; token-refresh runs on Mondays at 3am UTC

    const now = new Date();
    const dayOfWeek = now.getUTCDay(); // 0 = Sunday, 1 = Monday
    const hour = now.getUTCHours();

    // Token refresh: only on Monday at 3am UTC
    if (dayOfWeek === 1 && hour === 3) {
      ctx.waitUntil(refreshInstagramToken(env));
      return;
    }

    // Post refresh: every 30 minutes
    ctx.waitUntil(refreshInstagramPosts(env));
  },
};

/**
 * Refresh Instagram posts from the API and cache them
 */
async function refreshInstagramPosts(env: Env): Promise<void> {
  try {
    // Check if KV is configured (Release 2+)
    if (!env.INSTAGRAM_KV) {
      console.error(
        '[RTB Worker] Post refresh: INSTAGRAM_KV not configured. Skipping. (Release 2+ feature)',
      );
      return;
    }

    const token = await env.INSTAGRAM_KV.get('access_token');

    if (!token) {
      console.error(
        '[RTB Worker] Post refresh: no access_token in KV. Skipping.',
      );
      return;
    }

    // Fetch latest posts from Instagram Graph API
    const graphUrl = new URL('https://graph.instagram.com/me/media');
    graphUrl.searchParams.set(
      'fields',
      'id,caption,media_type,timestamp,media_url,permalink',
    );
    graphUrl.searchParams.set('limit', '12');
    graphUrl.searchParams.set('access_token', token);

    const response = await fetch(graphUrl.toString());

    if (!response.ok) {
      console.error(
        `[RTB Worker] Instagram API error: ${response.status} ${response.statusText}`,
      );
      return;
    }

    const data = (await response.json()) as {
      data?: Array<{
        id: string;
        caption?: string;
        media_type: string;
        timestamp: string;
        media_url?: string;
        permalink: string;
      }>;
    };

    if (!data.data || !Array.isArray(data.data)) {
      console.error(
        '[RTB Worker] Instagram API response missing or invalid data array',
      );
      return;
    }

    // Normalize and build posts array
    const posts: InstagramPost[] = data.data.map((media) => ({
      id: media.id,
      caption: media.caption || '',
      media_type: media.media_type as 'IMAGE' | 'VIDEO' | 'CAROUSEL',
      timestamp: media.timestamp,
      media_url: media.media_url,
      permalink: media.permalink,
    }));

    // Fetch metadata from KV
    const tokenRefreshedAtStr = await env.INSTAGRAM_KV.get(
      'token_refreshed_at',
    ) ?? undefined;

    // Create response with cache and CORS headers
    const now = new Date().toISOString();
    const postsResponse: PostsResponse = {
      posts,
      cached_at: now,
      token_refreshed_at: tokenRefreshedAtStr,
    };
    const cachedResponse = new Response(JSON.stringify(postsResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=7200',
        'Access-Control-Allow-Origin': '*',
      },
    });

    // Write to cache using /api/latest-posts as key
    const cacheRequest = new Request(
      'https://rouletabille.fr/api/latest-posts',
      {
        method: 'GET',
      },
    );
    await caches.default.put(cacheRequest, cachedResponse.clone());

    console.log(
      `[RTB Worker] Post refresh successful: cached ${posts.length} posts at ${now}`,
    );
  } catch (error) {
    console.error('[RTB Worker] Post refresh error:', error);
    // Don't throw; let the scheduler continue
  }
}

/**
 * Refresh Instagram access token if it's near expiry
 * Called weekly on Monday at 3am UTC
 */
async function refreshInstagramToken(env: Env): Promise<void> {
  try {
    // Check if KV is configured (Release 2+)
    if (!env.INSTAGRAM_KV) {
      console.warn(
        '[RTB Worker] Token refresh: INSTAGRAM_KV not configured. Skipping. (Release 2+ feature)',
      );
      return;
    }

    const expiresAtStr = await env.INSTAGRAM_KV.get('expires_at');

    if (!expiresAtStr) {
      console.warn(
        '[RTB Worker] Token refresh: no expires_at in KV. Skipping.',
      );
      return;
    }

    const expiresAt = new Date(expiresAtStr);
    const now = new Date();
    const daysUntilExpiry =
      (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

    // Only refresh if less than 7 days remaining
    if (daysUntilExpiry > 7) {
      console.log(
        `[RTB Worker] Token refresh: ${daysUntilExpiry.toFixed(1)} days until expiry. Skipping.`,
      );
      return;
    }

    console.warn(
      `[RTB Worker] Token refresh: ${daysUntilExpiry.toFixed(1)} days until expiry. Attempting refresh.`,
    );

    const currentToken = await env.INSTAGRAM_KV.get('access_token');

    if (!currentToken) {
      console.error('[RTB Worker] Token refresh: no access_token in KV.');
      return;
    }

    // Call Instagram's refresh_access_token endpoint
    const refreshUrl = new URL(
      'https://graph.instagram.com/refresh_access_token',
    );
    refreshUrl.searchParams.set('access_token', currentToken);

    const response = await fetch(refreshUrl.toString());

    if (!response.ok) {
      console.error(
        `[RTB Worker] Token refresh failed: ${response.status} ${response.statusText}`,
      );
      return;
    }

    const result = (await response.json()) as {
      access_token: string;
      token_type: string;
      expires_in: number;
    };

    if (!result.access_token || !result.expires_in) {
      console.error(
        '[RTB Worker] Token refresh: invalid response from Instagram API',
      );
      return;
    }

    // Calculate new expiry time (expires_in is seconds)
    const newExpiresAt = new Date(
      now.getTime() + result.expires_in * 1000,
    ).toISOString();

    // Update KV with new token and metadata
    await env.INSTAGRAM_KV.put('access_token', result.access_token);
    await env.INSTAGRAM_KV.put('expires_at', newExpiresAt);
    await env.INSTAGRAM_KV.put(
      'token_refreshed_at',
      now.toISOString(),
    );

    console.log(
      `[RTB Worker] Token refresh successful at ${now.toISOString()}. New expiry: ${newExpiresAt}`,
    );
  } catch (error) {
    console.error('[RTB Worker] Token refresh error:', error);
    // Don't throw; let the scheduler continue
  }
}
