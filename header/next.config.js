/** @type {import('next').NextConfig} */
const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  // Disable Next.js cache in development
  productionBrowserSourceMaps: true, // Why disabled : sometimes when trying to refresh the page we receive erros from cache removed.
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'header',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './component/Header': './src/components/Header.tsx',
          },
          shared: {},
        })
      );
    }

    return config;
  },
};
