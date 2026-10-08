import { describe, expect, test } from 'vitest';

import { galleryId, normalizePhotos } from './index.js';

const photo = (overrides = {}) => ({
  src: '/imgs/rtc-01.jpg',
  alt: 'Un monocycliste franchit une dalle de grès.',
  ...overrides,
});

describe('normalizePhotos', () => {
  test('préserve l’ordre et le cardinal', () => {
    const result = normalizePhotos('G', [
      photo({ src: '/a.jpg' }),
      photo({ src: '/b.jpg' }),
      photo({ src: '/c.jpg' }),
    ]);

    expect(result).toHaveLength(3);
    expect(result.map((item) => item.src)).toEqual([
      '/a.jpg',
      '/b.jpg',
      '/c.jpg',
    ]);
  });

  test.each([
    ['alt absent', { alt: undefined }],
    ['alt vide', { alt: '' }],
    ['alt fait d’espaces', { alt: '   ' }],
  ])('rejette un %s', (_label, overrides) => {
    expect(() => normalizePhotos('G', [photo(overrides)])).toThrow(
      /« alt » est obligatoire/,
    );
  });

  test.each([
    ['src absent', { src: undefined }],
    ['src vide', { src: '  ' }],
  ])('rejette un %s', (_label, overrides) => {
    expect(() => normalizePhotos('G', [photo(overrides)])).toThrow(
      /« src » est obligatoire/,
    );
  });

  test('rejette une source distante', () => {
    expect(() =>
      normalizePhotos('G', [photo({ src: 'https://exemple.test/a.jpg' })]),
    ).toThrow(/chemin absolu local/);
  });

  test('cite le libellé de galerie et le rang de la photo fautive', () => {
    expect(() =>
      normalizePhotos('Roule Ton Caillou', [photo(), photo({ alt: '' })]),
    ).toThrow(/Galerie « Roule Ton Caillou », photo 2/);
  });

  test('une légende absente devient une chaîne vide', () => {
    expect(normalizePhotos('G', [photo()])[0].caption).toBe('');
  });

  test('rogne les espaces superflus de alt et caption', () => {
    const [item] = normalizePhotos('G', [
      photo({ alt: '  Un sentier rocheux.  ', caption: '  Photo : Ivan  ' }),
    ]);

    expect(item.alt).toBe('Un sentier rocheux.');
    expect(item.caption).toBe('Photo : Ivan');
  });

  test('accepte une liste vide', () => {
    expect(normalizePhotos('G', [])).toEqual([]);
  });

  // WebC evaluates the component once without props: throwing here would break the build.
  test('retourne une liste vide quand aucun argument n’est fourni', () => {
    expect(normalizePhotos()).toEqual([]);
  });

  test('rejette un libellé fourni sans liste de photos', () => {
    expect(() => normalizePhotos('G', undefined)).toThrow(/:@photos/);
  });
});

describe('galleryId', () => {
  test.each([
    ['Photos de Roule Ton Caillou', 'pc-photos-de-roule-ton-caillou'],
    ['Édition d’été 2025 !', 'pc-edition-d-ete-2025'],
    ['  Espaces  ', 'pc-espaces'],
  ])('normalise %s en %s', (label, expected) => {
    expect(galleryId(label)).toBe(expected);
  });

  test('tolère un libellé absent', () => {
    expect(galleryId()).toBe('');
  });

  test('deux libellés distincts donnent deux identifiants distincts', () => {
    expect(galleryId('Printemps')).not.toBe(galleryId('Hiver'));
  });
});
