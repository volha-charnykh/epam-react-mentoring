import {configureStore} from "@reduxjs/toolkit";
import filmsReducer from './slices/films.slice';
import genresReducer from './slices/genres.slice';
import filmDetailsReducer from './slices/film-details.slice';
import selectedFilmReducer from './slices/selected-film.slice';
import searchParamsReducer from './slices/search-params.slice';
import dialogsReducer from './slices/dialogs.slice';

const createStore = state =>  configureStore({
    preloadedState: state,
    reducer: {
        filmDetails: filmDetailsReducer,
        films: filmsReducer,
        genres: genresReducer,
        searchParams: searchParamsReducer,
        selectedFilm: selectedFilmReducer,
        dialogs: dialogsReducer,
    }
});

export default createStore;
