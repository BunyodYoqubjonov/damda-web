/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru', 'uz'],
    defaultLocale: 'ru',
    localeDetection: false,
  },
}

module.exports = nextConfig
