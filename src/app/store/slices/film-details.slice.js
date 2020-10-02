import {createSlice} from "@reduxjs/toolkit";
import {FilmApi} from "../../api/films.api";

export const filmDetailsSlice = createSlice({
    name: 'filmDetails',
    initialState: null,
    reducers: {
        setFilmDetails: (state, action) => {
            return action.payload
        }
    }
});

const {setFilmDetails} = filmDetailsSlice.actions;

export const loadFilmDetails = (id, onSuccess = () => {}, onError = () => {}) => (dispatch) =>
    FilmApi.loadFilmById(id).then(result => {
        dispatch(setFilmDetails(result));
        return result;
    }).then(d => onSuccess(dispatch, d)).catch(err => onError(dispatch, err));

export default filmDetailsSlice.reducer;
