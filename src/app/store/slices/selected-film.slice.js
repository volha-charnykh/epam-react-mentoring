import { createSlice } from '@reduxjs/toolkit';

export const selectedFilmSlice = createSlice({
  name: 'selectedFilm',
  initialState: null,
  reducers: {
    setSelectedFilm: (state, action) => action.payload,
  },
});

export const { setSelectedFilm } = selectedFilmSlice.actions;

export const selectSelectedFilm = (state) => state.selectedFilm;

export default selectedFilmSlice.reducer;
