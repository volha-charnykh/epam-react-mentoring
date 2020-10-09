import React, {Suspense} from 'react';
import '../../../general/styles/buttons.scss';
import {useDispatch, useSelector} from "react-redux";
import {selectSearchParams, setAddEditDialogOpen, setSearchString} from "../../store";
import {Redirect, Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import Loading from "../../../general/components/loading/loading";

const ViewerHeader = React.lazy(() => import("./viewer-header/viewer-header"));
const FilmDetailsHeader = React.lazy(() => import("./film-details-header/film-details-header"));

export default function FilmsHeaderContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const genre = query.get("genre");
    const searchParams = useSelector(selectSearchParams);
    const match = useRouteMatch();

    const updateSearchStr = str => {
        if (str) {
            dispatch(setSearchString(str));
            history.push(`/films?title=${str}${genre ? '&genre=' + genre : ''}`);
        } else {
            dispatch(setSearchString(null));
            history.push(`/films${genre ? '?genre=' + genre : ''}`);
        }
    }

    return (
        <Switch>
            <Route exact
                path={match.path}>
                <Suspense fallback={<Loading/>}>
                    <ViewerHeader
                        searchString={searchParams.searchString}
                        updateSearchStr={updateSearchStr}
                        onAddFilm={() => dispatch(setAddEditDialogOpen(true))}/>
                </Suspense>
            </Route>
            <Route exact
                path={`${match.path}/:filmId`}>
                <Suspense fallback={<Loading/>}>
                    <FilmDetailsHeader/>
                </Suspense>
            </Route>
            <Route path="*"
                render={() => (
                    <Redirect to="/page-not-found"/>
                )}/>
        </Switch>
    );
}
