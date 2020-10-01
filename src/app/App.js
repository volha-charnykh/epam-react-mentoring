import React, {Suspense} from 'react';
import './App.scss';
import AppErrorBoundary from "./error-boundary/app-error-boundary";
import Loading from "../general/components/loading/loading";
import {Provider} from 'react-redux';
import store from "./store";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

const FilmsViewer = React.lazy(() => import("./films-viewer/films-viewer"));
const Films = React.lazy(() => import("./films-viewer/films/films"));
const PageNotFound = React.lazy(() => import("./page-not-found/page-not-found"));
const NoFilms = React.lazy(() => import("./films-viewer/no-films/no-films"));

export default function App() {
    return (
        <React.StrictMode>
            <AppErrorBoundary>
                <Provider store={store}>
                    <Router>
                        <Switch>
                            <Route exact
                                path="/"
                                render={() => (
                                    <Redirect to="/no-films"/>
                                )}/>
                            <Route exact  path="/no-films">
                                <Suspense fallback={<Loading/>}>
                                    <FilmsViewer><NoFilms/></FilmsViewer>
                                </Suspense>
                            </Route>
                            <Route exact path="/search">
                                <Suspense fallback={<Loading/>}>
                                    <FilmsViewer><Films/></FilmsViewer>
                                </Suspense>
                            </Route>
                            <Route exact path="/page-not-found">
                                <Suspense fallback={<Loading/>}>
                                    <PageNotFound/>
                                </Suspense>
                            </Route>
                            <Route
                                render={() => (
                                    <Redirect to="/page-not-found"/>
                                )}/>
                        </Switch>
                    </Router>
                </Provider>
            </AppErrorBoundary>
        </React.StrictMode>
    );
}
