import React, {useEffect} from 'react';
import './films-list.scss';
import FilmItem from './film-item/film-item';
import {useDispatch, useSelector} from "react-redux";
import {selectFilms} from "../../../store/selectors";
import {
    loadFilms,
    setActiveGenre,
    setAddEditDialogOpen,
    setConfirmationDialog,
    setSearchString,
    setSelectedFilm
} from "../../../store/slices";
import {useHistory, useLocation} from "react-router-dom";


export default function FilmsList() {
    const films = useSelector(selectFilms);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const genre = query.get("genre");
    const title = query.get("title");

    useEffect(() => {
        dispatch(loadFilms());
    }, []);

    useEffect(() => {
        dispatch(setActiveGenre(genre));
        dispatch(setSearchString(title));
    }, [genre, title]);

    useEffect(() => {
        if (!films.length) {
           history.push('/no-films' + location.search);
        }
    }, [films.length]);

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

    const viewFilmDetails = (f) => {
        history.push({
            pathname: `/films/${f.id}`,
            search: location.search
        });
        window.scrollTo(0, 0);
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
                            clickHandler={() => viewFilmDetails(el)}/>)
                }
            </div>
        </>
    );
}
