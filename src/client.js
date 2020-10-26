import React from 'react';
import {hydrate} from 'react-dom';
import App from './app/app';
import {BrowserRouter} from 'react-router-dom';
import createStore from './app/store';
import {RequestContext} from "./general/hooks/server-effect";
import Loadable from 'react-loadable';

const store = createStore(window.PRELOADED_STATE);

const app = (
    <RequestContext.Provider value={{}}>
        <App
            Router={BrowserRouter}
            store={store}
        />
    </RequestContext.Provider>
);

Loadable.preloadReady().then(() =>
    hydrate(app, document.getElementById('root')));

