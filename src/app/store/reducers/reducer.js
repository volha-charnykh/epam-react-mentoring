import {combineReducers} from 'redux';
import {films} from './films';
import {genres} from './genres';
import {filmViewer} from "./film-viewer";

export default combineReducers({films, genres, filmViewer});
