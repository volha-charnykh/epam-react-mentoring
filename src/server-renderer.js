import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App from './app/App';
import {RequestContext} from './general/hooks/server-effect';
import createStore from './app/store';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

function renderHTML(html, preloadedState, styles = [], scripts = []) {
    return `
      <!doctype html>
      <html>
        <head>
          <link rel="shortcut icon" href="favicon.png">
          <meta charset=utf-8>
          <title>React Server Side Rendering</title>
           ${styles.map(style => `<link href="${style.file}" rel="stylesheet"/>`).join('\n')}
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          ${scripts.map(script => `<script src="${script.file}"></script>`).join('\n')}
        </body>
      </html>
  `;
}

function serverRenderer() {
    return async (req, res) => {
        const store = createStore();
        const context = {};
        const contextValue = {requests: []};
        let modules = [];

        const renderRoot = () => (
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                <RequestContext.Provider value={contextValue}>
                    <App
                        context={context}
                        location={req.url}
                        Router={StaticRouter}
                        store={store}
                    />
                </RequestContext.Provider>
            </Loadable.Capture>
        );

        await Loadable.preloadAll();

        renderToString(renderRoot());

        if (context.url) {
            res.writeHead(302, {
                Location: context.url,
            });
            res.end();
            return;
        }

        const stats = require('../dev/react-loadable.json');
        let bundles = getBundles(stats, modules);

        let styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
        let scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

        await Promise.all(contextValue.requests);
        delete contextValue.requests;

        const htmlString = renderToString(renderRoot());
        const preloadedState = store.getState();

        res.send(renderHTML(htmlString, preloadedState, styles, scripts));
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


const closeServer = () => {
    if (!!server) {
        server.close(() => {
            console.info(`Server was closed successfully.`);
        });
    }
};

process.on('SIGINT', closeServer)
    .on('SIGTERM', closeServer)
    .on('uncaughtException',
        error => {
            console.error(`Uncaught Exception thrown: ${ error }`);
            closeServer();
        })
    .on('unhandledRejection',
        error => {
            console.error(`Unhandled Rejection at Promise: ${ error } `);
            // closeServer();
        });
