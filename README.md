# Microfrontends with Next.js

This is a sample project that demonstrates how to implement microfrontends using Next.js. The project includes three microfrontends: header, menu, and consumer.

## Overview

Each microfrontend is a separate Next.js application that can be developed and deployed independently. The header and menu microfrontends provide UI components that can be consumed by other microfrontends, such as the consumer.

The consumer microfrontend is an example of how to consume the header and menu microfrontends in a single Next.js application. It shows how to use module federation to load the microfrontends at runtime, and how to use them in a shared layout.

## Folder structure
```css
├── consumer
│   ├── components
│   ├── pages
│   └── ...
├── header
│   ├── components
│   ├── pages
│   └── ...
├── menu
│   ├── components
│   ├── pages
│   └── ...
└── ...

```
* `consumer`: The main Next.js application that consumes the header and menu microfrontends.
* `header`: A microfrontend that provides a header component with an avatar and a drawer menu.
* `menu`: A microfrontend that provides a menu component with links to different pages.


# How to run

1. Clone this repo
2. Run `npm run install` in root folder
3. Run `npm run dev` in root folder
4. Open `localhost:3005` in your browser

Each microfrontend will be available at a different port:

* header: http://localhost:3000
* menu: http://localhost:3004
* consumer: http://localhost:3005
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

## Credits
This project was created by Hugo Oliveira.


License 
This project is licensed under the MIT License - see the LICENSE file for details.

Feel free to customize this README to your liking and add any additional information that you think would be helpful for others using your application.
