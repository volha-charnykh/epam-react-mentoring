import { createSlice } from '@reduxjs/toolkit';
import { FilmApi } from '../../api/films.api';

export const filmDetailsSlice = createSlice({
  name: 'filmDetails',
  initialState: null,
  reducers: {
    setFilmDetails: (state, action) => action.payload,
  },
});

const { setFilmDetails } = filmDetailsSlice.actions;

export const loadFilmDetails = (id, success = () => {}, onError = () => {}) => (dispatch) => FilmApi
  .loadFilmById(id).then((result) => {
    dispatch(setFilmDetails(result));
    return result;
  }).then((d) => success(dispatch, d)).catch((err) => onError(dispatch, err));

export const selectFilmDetails = (state) => state.filmDetails;

export default filmDetailsSlice.reducer;
