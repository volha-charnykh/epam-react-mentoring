import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App from './app/App';
import {RequestContext} from './general/hooks/server-effect';
import createStore from './app/store';

function renderHTML(html, preloadedState) {
    return `
      <!doctype html>
      <html>
        <head>
          <meta charset=utf-8>
          <title>React Server Side Rendering</title>
          <link rel="shortcut icon" href="/" />
          <link rel="shortcut icon" href="#" />
          <link rel="stylesheet" type="text/css" href="/styles.css" />
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>

          <script src="/main.js"></script>
        </body>
      </html>
  `;
}

function serverRenderer() {
    return async(req, res) => {
        const store = createStore();

        const context = {};

        const contextValue = { requests: [] };

        const renderRoot = () => (
            <RequestContext.Provider value={contextValue}>
                <App
                    context={context}
                    location={req.url}
                    Router={StaticRouter}
                    store={store}
                />
            </RequestContext.Provider>
        );

        renderToString(renderRoot());

        if (context.url) {
            res.writeHead(302, {
                Location: context.url,
            });
            res.end();
            return;
        }

        await Promise.all(contextValue.requests);

        delete contextValue.requests;

        const htmlString = renderToString(renderRoot());
        const preloadedState = store.getState();

        res.send(renderHTML(htmlString, preloadedState));
    };
}


const express = require('express');

const app = express();
const port = process.env.PORT || 3060;

app.use(express.static('dev'));
app.use(serverRenderer());

const server = app.listen(port, () => {
    console.info(`Express listening on port ${port}`);
});

process.on('uncaughtException',
        error => {
            console.error(`Uncaught Exception thrown: ${ error }`);
            closeServer();
        })
    .on('unhandledRejection',
        error => {
            console.error(`Unhandled Rejection at Promise: ${ error } `);
            closeServer();
        });

const closeServer = () =>  {
    if (!!server) {
        server.close(() => {
            console.info(`Server was closed successfully.`);
        });
    }};
