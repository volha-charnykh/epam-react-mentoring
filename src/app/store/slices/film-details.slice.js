import {createSlice} from "@reduxjs/toolkit";

export const filmDetailsSlice = createSlice({
    name: 'filmDetails',
    initialState: null,
    reducers: {
        setFilmDetails: (state, action) => {
            return action.payload
        }
    }
});

export const {setFilmDetails} = filmDetailsSlice.actions;

export default filmDetailsSlice.reducer;
