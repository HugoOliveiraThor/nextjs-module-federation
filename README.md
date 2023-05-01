# Micro-frontend's NextJS

In this repo i implements two next JS application using micro-frontend architecture.

# How to run

1. Clone this repo
2. Run `npm run install` in root folder
3. Run `npm run dev` in root folder
4. Open `localhost:3005` in your browser

# How to build

1. Run `npm run build` in root folder
2. Run `npm run start`
3. Open `localhost:3005` in your browser

# How to create a new project from zero 
1. Run a npx create-next-app@latest --typescript 
2. After create  the project install this dependency `@module-federation/nextjs-mf@6.0.7`
3. Update the next.config.js to that basic configuration below
   
 ```javascript
/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "nameOfYourMicrofrontend",
          filename: "static/chunks/remoteEntry.js", // The file that will be consumed by the shell to render files
          exposes: {
            "./component/Footer": "./src/components/Footer.tsx", // The component or what you want to expose 
          },
          shared: {}, // 
        })
      );
    }

    return config;
  },
};

```

4. After add the configurations in the MFE you have to go to the Shell project and register the MFE , go to next.config.js and add those configurations :

```javascript

/** @type {import('next').NextConfig} */

const NextFederationPlugin = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "consumer",
          remotes: { // Add all your remotes Micro Front Ends MFE here
            header: `header@http://localhost:3000/_next/static/chunks/remoteEntry.js`, // This config in production must be replace to add the basic url http://localhost:3000/
            footer: `footer@http://localhost:3003/_next/static/chunks/remoteEntry.js`,
            dashboard: `dashboard@http://localhost:3004/_next/static/chunks/remoteEntry.js`
          },
          filename: "static/chunks/remoteEntry.js",
          shared: {},
        })
      );
    }

    return config;
  },
};

```
