import React from 'react';
import '../../../general/styles/buttons.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect, Route, Switch, useHistory, useLocation, useRouteMatch,
} from 'react-router-dom';
import {
  selectSearchParams, setAddEditDialogOpen, setSearchString, setSelectedFilm,
} from '../../store';
import ViewerHeader from './viewer-header/viewer-header';
import FilmDetailsHeader from './film-details-header/film-details-header';

export default function FilmsHeaderContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const genre = query.get('genre');
  const searchParams = useSelector(selectSearchParams);
  const match = useRouteMatch();

  const updateSearchStr = (str) => {
    if (str) {
      dispatch(setSearchString(str));
      history.push(`/films?title=${str}${genre ? `&genre=${genre}` : ''}`);
    } else {
      dispatch(setSearchString(null));
      history.push(`/films${genre ? `?genre=${genre}` : ''}`);
    }
  };

  const openAddDialog = () => {
    dispatch(setSelectedFilm(null));
    dispatch(setAddEditDialogOpen(true));
  };

  return (
    <Switch>
      <Route
        exact
        path={match.path}
      >
        <ViewerHeader
          searchString={searchParams.searchString}
          updateSearchStr={updateSearchStr}
          onAddFilm={openAddDialog}
        />
      </Route>
      <Route
        exact
        path={`${match.path}/:filmId`}
      >
        <FilmDetailsHeader />
      </Route>
      <Route
        path="*"
        render={() => (
          <Redirect to="/page-not-found" />
        )}
      />
    </Switch>
  );
}
