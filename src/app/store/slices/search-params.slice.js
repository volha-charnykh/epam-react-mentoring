import { createSlice } from '@reduxjs/toolkit';
import { loadFilms } from './films.slice';

export const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState: {
    sortType: 'release_date',
    sortOrder: 'desc',
    limit: 20,
    activeGenre: '',
    searchString: '',
  },
  reducers: {
    updateActiveGenre: (state, action) => ({ ...state, activeGenre: action.payload }),
    updateSearchString: (state, action) => ({ ...state, searchString: action.payload }),
    updateSortOrder: (state, action) => ({ ...state, sortOrder: action.payload }),
    updateSortType: (state, action) => ({ ...state, sortType: action.payload }),
    updateLimit: (state, action) => ({ ...state, limit: action.payload }),
  },
});

const {
  updateActiveGenre, updateSearchString, updateSortOrder, updateSortType, updateLimit,
} = searchParamsSlice.actions;

export const setSearchString = (searchString) => (dispatch, getState) => {
  if (getState().searchParams.searchString !== searchString) {
    dispatch(updateSearchString(searchString));
    dispatch(loadFilms());
  }
};

export const setActiveGenre = (activeGenre) => (dispatch, getState) => {
  if (getState().searchParams.activeGenre !== activeGenre) {
    dispatch(updateActiveGenre(activeGenre));
    dispatch(loadFilms());
  }
};

export const setSortType = (sortType) => (dispatch, getState) => {
  if (getState().searchParams.sortType !== sortType) {
    dispatch(updateSortType(sortType));
    dispatch(loadFilms());
  }
};

export const setSortOrder = (sortOrder) => (dispatch, getState) => {
  if (getState().searchParams.sortOrder !== sortOrder) {
    dispatch(updateSortOrder(sortOrder));
    dispatch(loadFilms());
  }
};

export const setLimit = (limit) => (dispatch, getState) => {
  if (getState().searchParams.limit !== limit) {
    dispatch(updateLimit(limit));
    dispatch(loadFilms());
  }
};

export const selectSearchParams = (state) => state.searchParams;

export default searchParamsSlice.reducer;
