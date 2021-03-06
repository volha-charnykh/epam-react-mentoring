import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import AppErrorBoundary from './error-boundary/app-error-boundary';
import Loading from '../general/components/loading/loading';

const FilmsViewer = Loadable({
  loader: () => import('./films-viewer/films-viewer'),
  loading: Loading,
});
const Films = Loadable({
  loader: () => import('./films-viewer/films/films'),
  loading: Loading,
});
const PageNotFound = Loadable({
  loader: () => import('./page-not-found/page-not-found'),
  loading: Loading,
});
const NoFilms = Loadable({
  loader: () => import('./films-viewer/no-films/no-films'),
  loading: Loading,
});
const Home = Loadable({
  loader: () => import('./home/home'),
  loading: Loading,
});

// PATTERN: Lazy loading
const App = ({
  // eslint-disable-next-line react/prop-types
  Router, location, context, store,
}) => (
  <AppErrorBoundary>
    <Provider store={store}>
      <Router
        location={location}
        context={context}
      >
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Redirect to="/home" />
            )}
          />
          <Route
            exact
            path="/home"
          >
            <Home />
          </Route>
          <Route
            exact
            path="/no-films"
          >
            <FilmsViewer><NoFilms /></FilmsViewer>
          </Route>
          <Route path="/films">
            <FilmsViewer><Films /></FilmsViewer>
          </Route>
          <Route
            exact
            path="/page-not-found"
          >
            <PageNotFound />
          </Route>
          <Route
            path="*"
            render={() => (
              <Redirect to="/page-not-found" />
            )}
          />
        </Switch>
      </Router>
    </Provider>
  </AppErrorBoundary>
);

export default App;
