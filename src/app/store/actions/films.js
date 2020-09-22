import {ACTIONS} from './action-types';

const moviesUrl = 'http://localhost:4000/movies';
const defaultLimit = 20;

export const loadFilms = (params = {}) =>
    dispatch => fetch(moviesUrl + calcQueryStr(params))
        .then(response => response.json())
        .then(json => {
            dispatch({type: ACTIONS.SET_ALL_FILMS, payload: json.data || []});
            dispatch({type: ACTIONS.SET_ALL_GENRES_OF_FILMS, payload: json.data || []})
        });

const calcQueryStr =
    ({
         sortType,
         sortOrder,
         activeGenre,
         searchString,
         limit = defaultLimit
     }) => {
        let str = `?limit=${limit}`;
        if (sortType) {
            str += `&sortBy=${sortType}`;
        }
        if (sortOrder && (sortOrder === 'asc' || sortOrder === 'desc')) {
            str += `&sortOrder=${sortOrder}`;
        }
        if (activeGenre) {
            str += `&filter=${[activeGenre]}`;
        }
        if (searchString) {
            str += `&search=${searchString}`;
            str += `&searchBy=title`;
        }
        return str;
    }

export const addFilm = newFilm => () => fetch(moviesUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newFilm)
});

export const updateFilm = film => () => fetch(moviesUrl, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(film)
});

export const deleteFilm = film => () => fetch(moviesUrl + '/' + film.id, {method: 'DELETE'});

