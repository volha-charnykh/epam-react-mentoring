import {createSlice} from "@reduxjs/toolkit";

export const selectedFilmSlice = createSlice({
    name: 'selectedFilm',
    initialState: null,
    reducers: {
        setSelectedFilm: (state, action) => {
            return action.payload
        }
    }
});

export const {setSelectedFilm} = selectedFilmSlice.actions;

export default selectedFilmSlice.reducer;
