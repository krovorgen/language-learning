/** @type {import('next').NextConfig} */
const { withGlobalCss } = require('next-global-css');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([withGlobalCss()], {
  reactStrictMode: true,
});
