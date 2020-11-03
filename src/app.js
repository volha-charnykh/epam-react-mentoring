const express = require('express');

const app = express();
const port = process.env.PORT || 3060;

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackConfig = require('../webpack/ssr/webpack.dev.config');

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler.compilers.find((c) => c.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

const server = app.listen(port, () => {
  console.info(`Express listening on port ${port}`);
});

const closeServer = () => {
  if (server) {
    server.close(() => {
      console.info('Server was closed successfully.');
    });
  }
};

process.on('SIGINT', closeServer)
  .on('SIGTERM', closeServer)
  .on('uncaughtException',
    (error) => {
      console.error(`Uncaught Exception thrown: ${error}`);
      closeServer();
    })
  .on('unhandledRejection',
    (error) => {
      console.error(`Unhandled Rejection at Promise: ${error} `);
      closeServer();
    });
