import React from 'react';
import {hydrate} from 'react-dom';
import App from './app/app';
import {BrowserRouter} from 'react-router-dom';
import {loadableReady} from '@loadable/component';
import {configureStore} from "@reduxjs/toolkit";
import createStore from './app/store';
import {RequestContext} from "./general/hooks/server-effect";

const store = createStore(window.PRELOADED_STATE);

const app = (
    <RequestContext.Provider value={{}}>
    <App
        Router={BrowserRouter}
        store={store}
    />
    </RequestContext.Provider>
);

hydrate(app, document.getElementById('root'));

