import React, {Suspense} from 'react';
import './App.scss';
import AppErrorBoundary from "./error-boundary/app-error-boundary";
import Loading from "../general/components/loading/loading";
import { Provider } from 'react-redux';
import store from "./store";

const FilmViewerContainer = React.lazy(() => import("./films-viewer/film-viewer-container"));

export default function App() {
    return (
        <React.StrictMode>
            <AppErrorBoundary>
                <Provider store={store}>
                    <Suspense fallback={<Loading/>}>
                        <FilmViewerContainer/>
                    </Suspense>
                </Provider>
            </AppErrorBoundary>
        </React.StrictMode>
    );
}
