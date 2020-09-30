import React, {Suspense} from 'react';
import './App.scss';
import AppErrorBoundary from "./error-boundary/app-error-boundary";
import Loading from "../general/components/loading/loading";
import { Provider } from 'react-redux';
import store from "./store";

const FilmViewer = React.lazy(() => import("./films-viewer/films-viewer"));

export default function App() {
    return (
        <React.StrictMode>
            <AppErrorBoundary>
                <Provider store={store}>
                    <Suspense fallback={<Loading/>}>
                        <FilmViewer/>
                    </Suspense>
                </Provider>
            </AppErrorBoundary>
        </React.StrictMode>
    );
}
