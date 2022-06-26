/** @type {import('next').NextConfig} */
const { withGlobalCss } = require('next-global-css');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withConfig = withGlobalCss();

module.exports = withPlugins([withConfig, withBundleAnalyzer], {
  reactStrictMode: true,
});
