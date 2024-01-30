# React-PWA-Redux-boilerplate

A boilerplate for Progresive web app built using create-react-app and configured with redux, eslint, precommits and other best practices

# Change the start and build scripts to these to configure webpack with the app

"start": "env-cmd -f .env.development webpack-dev-server --history-api-fallback --config=./config/webpack.dev.js --open",
"build": "env-cmd -f .env.development npm run dev && webpack --config=./config/webpack.common.js",

## Refer this URL for converting react-webpack-app into PWA

https://dev.to/chuksjoe/how-to-transform-a-react-app-built-on-webpack-to-pwa-glb
