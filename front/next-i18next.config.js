// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },
  localePath: path.resolve('./public/locales'),
}
