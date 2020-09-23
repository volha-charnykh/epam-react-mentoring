import {ACTIONS} from '../actions';

export function filmViewer(state = { sortType: 'release_date', sortOrder: 'desc' }, action) {
    switch (action.type) {
        case ACTIONS.SET_SEARCH_STRING:
            return {...state, searchString: action.payload};
        case ACTIONS.SET_ACTIVE_FILM:
            return {...state, activeFilm: action.payload};
        case ACTIONS.SET_ACTIVE_GENRE:
            return {...state, activeGenre: action.payload};
        case ACTIONS.SET_SORT_TYPE:
            return {...state, sortType: action.payload};
        case ACTIONS.SET_SORT_ORDER:
            return {...state, sortOrder: action.payload};
        default:
            return state;
    }
}
