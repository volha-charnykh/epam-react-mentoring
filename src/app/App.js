import React, {Suspense} from 'react';
import './App.scss';
import AppErrorBoundary from "./error-boundary/app-error-boundary";
import Loading from "../general/components/loading/loading";

const FilmViewerContainer = React.lazy(() => import("./films-viewer/film-viewer-container"));

export default function App() {
    return (
        <React.StrictMode>
            <AppErrorBoundary>
                <Suspense fallback={<Loading/>}>
                    <FilmViewerContainer/>
                </Suspense>
            </AppErrorBoundary>
        </React.StrictMode>
    );
}
