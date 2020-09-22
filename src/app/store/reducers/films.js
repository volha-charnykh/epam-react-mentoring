import { ACTIONS } from '../actions';

export function films(state = [], action) {
  switch (action.type) {
    case ACTIONS.SET_ALL_FILMS:
      return [...action.payload ];
    default: return state;
  }
}
