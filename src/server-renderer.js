import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable/webpack';
import App from './app/App';
import {RequestContext} from './general/hooks/server-effect';
import createStore from './app/store';

function renderHTML(html, preloadedState, styles = [], scripts = []) {
    return `
      <!doctype html>
      <html>
        <head>
          <meta charset=utf-8>
          <title>React Server Side Rendering</title>
           ${styles.map((style) => `<link href="/${style?.file}" rel="stylesheet"/>`).join('\n')}
          <link rel="shortcut icon" href="favicon.png">
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          ${scripts.map((script) => `<script src="/${script?.file}"></script>`).join('\n')}
        </body>
      </html>
  `;
}

export default function serverRenderer() {
    return async (req, res) => {
        const store = createStore();
        const context = {};
        const contextValue = {requests: []};
        const modules = [];

        const renderRoot = () => (
            <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
                <RequestContext.Provider value={contextValue}>
                    <div>Server</div>
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

        // eslint-disable-next-line global-require
        const stats = require('../build/react-loadable.json');

        const bundles = getBundles(stats, modules);

        const styles = bundles.filter((bundle) => bundle?.file?.endsWith('.css'));
        const scripts = bundles.filter((bundle) => bundle?.file?.endsWith('.js'));

        await Promise.all(contextValue.requests);
        delete contextValue.requests;

        const htmlString = renderToString(renderRoot());
        const preloadedState = store.getState();

        res.send(renderHTML(htmlString, preloadedState, styles, scripts));
    };
}
