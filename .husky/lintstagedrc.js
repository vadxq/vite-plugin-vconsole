module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.vue': ['eslint --fix', 'prettier --write'],
  '*.{vue,css,scss,postcss,less}': ['prettier --write'],
  '*.md': ['prettier --write']
};
