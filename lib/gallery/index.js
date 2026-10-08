/**
 * Normalize and validate the photo list passed to the `<photo-carousel>` component.
 * Any anomaly fails the build: a photo gallery is informative content, never decorative.
 *
 * @param {string} [name] gallery label, included in error messages
 * @param {Array<{src: string, alt: string, caption?: string}>} [photos]
 * @returns {Array<{src: string, alt: string, caption: string}>}
 */
export function normalizePhotos(name, photos) {
  // WebC also evaluates the component outside an instance context, without props.
  if (name === undefined && photos === undefined) {
    return [];
  }

  if (!Array.isArray(photos)) {
    throw new TypeError(
      `Galerie « ${name} » : « photos » doit être un tableau (reçu ${typeof photos}). ` +
        `Vérifiez l'attribut :@photos de l'appel au composant.`,
    );
  }

  return photos.map((photo, index) => {
    const where = `Galerie « ${name} », photo ${index + 1}`;

    if (!photo || typeof photo.src !== 'string' || photo.src.trim() === '') {
      throw new Error(`${where} : « src » est obligatoire.`);
    }

    if (!photo.src.startsWith('/')) {
      throw new Error(
        `${where} : « src » doit être un chemin absolu local (reçu « ${photo.src} »).`,
      );
    }

    if (typeof photo.alt !== 'string' || photo.alt.trim() === '') {
      throw new Error(
        `${where} (${photo.src}) : « alt » est obligatoire et doit être descriptif. ` +
          `Une galerie photo est un contenu informatif, pas décoratif.`,
      );
    }

    return {
      src: photo.src,
      alt: photo.alt.trim(),
      caption: typeof photo.caption === 'string' ? photo.caption.trim() : '',
    };
  });
}

/**
 * Stable HTML identifier derived from a gallery label so multiple carousels
 * on the same page do not collide.
 *
 * @param {string} [label]
 * @returns {string}
 */
export function galleryId(label) {
  if (typeof label !== 'string') {
    return '';
  }

  const slug = label
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `pc-${slug}`;
}
