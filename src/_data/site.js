export default {
  url: (path) =>
    new URL(path, 'https://rouletabille.fr').href
      .replace(/\/$/, '')
      .replace(/\.html/, ''),
  jsonLd: () => {
    const data = {
      '@context': 'https://schema.org',
      '@type': ['SportsClub', 'SportsOrganization'],
      name: 'Roule Ta Bille',
      alternateName: ['Roule Ta Bille (Monocycle)', 'RTB', 'RTB (Monocycle)'],
      description:
        "Association de monocycle, à Paris et en Ile-de-France. Son objectif est de faire découvrir et développer la pratique du monocycle au moyen d'une large gamme d'activités sportives de loisirs et/ou de compétitions sur une roue unique (basket, hockey, athlétisme, trial, free-style, randonnée, cross-country...) et d'animations ludiques (jeux, spectacles, initiations, stages...)",
      url: 'https://rouletabille.fr',
      email: 'association.rouletabille@gmail.com',
      sport: [
        'Monocycle',
        'https://fr.wikipedia.org/wiki/Monocycle',
        'Unicycling',
        'https://en.wikipedia.org/wiki/Unicycle',
      ],
      areaServed: [
        {
          '@type': 'AdministrativeArea',
          name: 'Paris',
          sameAs: [
            'https://fr.wikipedia.org/wiki/Paris',
            'https://en.wikipedia.org/wiki/Paris',
          ],
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Île-de-France',
          sameAs: [
            'https://fr.wikipedia.org/wiki/%C3%8Ele-de-France',
            'https://en.wikipedia.org/wiki/%C3%8Ele-de-France',
          ],
        },
      ],
      parentOrganization: {
        '@type': 'SportsOrganization',
        name: 'Commission Nationale du Monocycle',
        alternateName: 'CNM',
        url: 'https://monocycle.info/commission-nationale-monocycle/',
      },
      memberOf: {
        '@type': 'SportsOrganization',
        name: 'Union Nationale Sportive Léo Lagrange',
        alternateName: 'UNSLL',
        url: 'https://www.leolagrange-sport.org/pratiquer-un-sport/',
      },
      sameAs: [
        'https://www.facebook.com/rouletabillemonocycleparis',
        'https://www.instagram.com/rtb_monocycle',
      ],
    };

    return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
  },
};
