import {ACTIONS} from './action-types';
import {loadFilms} from "./films";

export const setActiveFilm = film => ({
    type: ACTIONS.SET_ACTIVE_FILM,
    payload: film
})

export const setSearchString = (searchString, params) =>
    dispatch => loadFilms({
        sortOrder: params.sortOrder,
        sortType: params.sortType,
        activeGenre: params.activeGenre,
        searchString: searchString
    })
    (dispatch)
        .then(() => dispatch({
            type: ACTIONS.SET_SEARCH_STRING,
            payload: searchString
        }));

export const setActiveGenre = (activeGenre, params) =>
    dispatch => loadFilms({
        sortOrder: params.sortOrder,
        sortType: params.sortType,
        activeGenre: activeGenre,
        searchString: params.searchString
    })
    (dispatch)
        .then(() => dispatch({
            type: ACTIONS.SET_ACTIVE_GENRE,
            payload: activeGenre
        }));

export const setSortType = (sortType, params) =>
    dispatch => loadFilms({
        sortOrder: params.sortOrder,
        sortType: sortType,
        activeGenre: params.activeGenre,
        searchString: params.searchString
    })
    (dispatch)
        .then(() => dispatch({
            type: ACTIONS.SET_SORT_TYPE,
            payload: sortType
        }));

export const setSortOrder = (sortOrder, params) =>
    dispatch => loadFilms({
        sortOrder: sortOrder,
        sortType: params.sortType,
        activeGenre: params.activeGenre,
        searchString: params.searchString
    })
    (dispatch)
        .then(() => dispatch({
            type: ACTIONS.SET_SORT_ORDER,
            payload: sortOrder
        }));
