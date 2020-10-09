import {createSlice} from "@reduxjs/toolkit";
import {FilmApi} from "../../api/films.api";
import {genresSlice, setGenres} from "./genres.slice";
import {selectSearchParams} from "./search-params.slice";

export const filmsSlice = createSlice({
    name: 'films',
    initialState: [],
    reducers: {
        setFilms: (state, action) => {
            return action.payload
        }
    }
});

export const {setFilms} = filmsSlice.actions;

export const loadFilms = (onSuccess = () => {}, onError = () => {}) =>
    (dispatch, getState) =>
        FilmApi.loadFilms(selectSearchParams(getState()))
        .then(result => {
            dispatch(setFilms(result));
            dispatch(setGenres(result));
            return result;
        })
        .then(d => onSuccess(dispatch, d))
        .catch(err => onError(dispatch, err));

export const addFilm = (newFilm, onSuccess = () => {}, onError = () => {}) => (dispatch) =>
    FilmApi.createFilm(newFilm).then(d => onSuccess(dispatch, d)).catch(err => onError(dispatch, err));

export const updateFilm = (film, onSuccess = () => {}, onError = () => {}) => (dispatch) =>
    FilmApi.updateFilm(film).then(d => onSuccess(dispatch, d)).catch(err => onError(dispatch, err));

export const deleteFilm = (film, onSuccess = () => {}, onError = () => {}) => (dispatch) =>
    FilmApi.deleteFilm(film).then(d => onSuccess(dispatch, d)).catch(err => onError(dispatch, err));

export const selectFilms = state => state.films;

export default filmsSlice.reducer;
