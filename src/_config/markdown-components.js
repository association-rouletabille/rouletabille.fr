// How each WebC component used in a Markdown page is rendered in that page's
// Markdown version (`/<page>.md`, which llms-full.txt is built from).
//
// A handler receives the component's props (`@src="…"` arrives as `src`) and
// `{ content, page }`: the Markdown it wraps, already rendered, and the
// Eleventy page. It returns Markdown, or `null` to leave the component out.
// Using a component without a handler here fails the build.

export default {
  // Photos add no information an LLM can use, and their alt text is redundant
  // with the surrounding prose.
  'content-hero-photo': () => null,

  // Same text and link as the component's own HTML (its aria-label and href).
  'youtube-embed': ({ id, label }) =>
    `[Visionner : ${label}](https://www.youtube-nocookie.com/embed/${id})`,
};
