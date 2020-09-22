import {ACTIONS} from "../actions";

export function genres(state = [], action) {
    switch (action.type) {
        case ACTIONS.SET_ALL_GENRES_OF_FILMS:
            return calculateAllGenres([...state], action.payload || []);
        default:
            return state;
    }
}

const calculateAllGenres = (state, films) => films.reduce((acc, cur) => {
    acc.push(...cur.genres.filter(g => !acc.includes(g) && !state.includes(g)));
    return acc;
}, state);
