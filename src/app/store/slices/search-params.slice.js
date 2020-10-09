import {createSlice} from "@reduxjs/toolkit";
import {loadFilms} from "./films.slice";

export const searchParamsSlice = createSlice({
    name: 'searchParams',
    initialState: {
        sortType: 'release_date',
        sortOrder: 'desc',
        limit: 20
    },
    reducers: {
        updateActiveGenre: (state, action) => {
            return {...state, activeGenre: action.payload}
        },
        updateSearchString: (state, action) => {
            return {...state, searchString: action.payload}
        },
        updateSortOrder: (state, action) => {
            return {...state, sortOrder: action.payload}
        },
        updateSortType: (state, action) => {
            return {...state, sortType: action.payload}
        },
        updateLimit: (state, action) => {
            return {...state, limit: action.payload}
        }
    }
});

const {updateActiveGenre, updateSearchString, updateSortOrder, updateSortType, updateLimit} = searchParamsSlice.actions;

export const setSearchString = (searchString) =>
    dispatch => {
        dispatch(updateSearchString(searchString));
        dispatch(loadFilms());
    };

export const setActiveGenre = (activeGenre) =>
    dispatch => {
        dispatch(updateActiveGenre(activeGenre));
        dispatch(loadFilms());
    };

export const setSortType = (sortType) =>
    dispatch => {
        dispatch(updateSortType(sortType));
        dispatch(loadFilms());
    };

export const setSortOrder = (sortOrder) =>
    dispatch => {
        dispatch(updateSortOrder(sortOrder));
        dispatch(loadFilms());
    };

export const setLimit = (limit) =>
    dispatch => {
        dispatch(updateLimit(limit));
        dispatch(loadFilms());
    };

export const selectSearchParams = state => state.searchParams;

export default searchParamsSlice.reducer;
