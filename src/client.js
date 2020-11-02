import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import createStore from './app/store';
import { RequestContext } from './general/hooks/server-effect';

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
