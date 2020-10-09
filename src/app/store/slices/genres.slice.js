import {createSlice} from "@reduxjs/toolkit";

export const genresSlice = createSlice({
    name: 'genres',
    initialState: [],
    reducers: {
        setGenres: (state, action) => {
            return calculateAllGenres([...state], action.payload || []);
        }
    }
});

export const {setGenres} = genresSlice.actions;

const calculateAllGenres = (state, films) => films.reduce((acc, cur) => {
    acc.push(...cur.genres.filter(g => !acc.includes(g) && !state.includes(g)));
    return acc;
}, state);

export const selectGenres = state => state.genres;

export default genresSlice.reducer;
