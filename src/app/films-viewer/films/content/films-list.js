import React from 'react';
import './films-list.scss';
import FilmItem from './film-item/film-item';
import {useDispatch, useSelector} from "react-redux";
import {selectFilms} from "../../../store/selectors";
import {setAddEditDialogOpen, setConfirmationDialog, setFilmDetails, setSelectedFilm} from "../../../store/slices";
import {useHistory} from "react-router-dom";


export default function FilmsList() {
    const films = useSelector(selectFilms);
    const dispatch = useDispatch();
    const history = useHistory();

    const actions = [
        {
            id: 0,
            title: 'Edit',
            handle: (film) => {
                dispatch(setSelectedFilm(film));
                dispatch(setAddEditDialogOpen(true));
            }
        },
        {
            id: 1,
            title: 'Delete',
            handle: (film) => {
                dispatch(setSelectedFilm(film));
                dispatch(setConfirmationDialog({
                    title: 'Delete Movie',
                    description: 'Are you sure you want to delete this movie?'
                }));
            }
        },
    ];

    const updateActiveFilm = (f) => {
        window.scrollTo(0, 0);
        dispatch(setFilmDetails(f));
    };

    return (<>

            <div className='FilmsCountContainer'>
                <span className='FilmsCount'>{films.length}</span> movies found
            </div>

            <div className='FilmList'>
                {
                    films.map(el =>
                        <FilmItem
                            key={el.id}
                            film={el}
                            actions={actions}
                            clickHandler={() => {
                                updateActiveFilm(el);
                                console.log(history.location.pathname + '/film/'+el.id);
                                history.push(history.location.pathname + '/film/'+el.id);
                            }}/>)
                }
            </div>
        </>
    );
}
