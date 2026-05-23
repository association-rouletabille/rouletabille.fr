export default {
  url: (path) =>
    new URL(path, 'https://rouletabille.fr').href
      .replace(/\/$/, '')
      .replace(/\.html/, ''),
};
