import React, {Suspense, useEffect, useState} from 'react';
import FilmViewer from "./films-viewer";
import Loading from "../../general/components/loading/loading";
import {usePrevState} from "../../general/hooks/prev-state";
import {connect} from "react-redux";
import {addFilm, loadFilms, updateFilm, deleteFilm} from "../store/actions/films";

const AddEditFilmDialog = React.lazy(() => import("../film-dialog/add-edit-dialog/add-edit-film-dialog"));
const DeleteDialog = React.lazy(() => import("../film-dialog/delete-dialog/delete-dialog"));


function FilmViewerContainer(props) {
    const [isAddEditDialogOpen, setAddEditDialogOpen, wasAddEditDialogOpen] = usePrevState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen, wasDeleteDialogOpen] = usePrevState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);

    useEffect(() => {
        props.loadFilms(props.filmViewer);
    }, []);

    useEffect(() => {
        if ((wasAddEditDialogOpen && !isAddEditDialogOpen) ||
            (wasDeleteDialogOpen && !isDeleteDialogOpen)) {
            props.loadFilms(props.filmViewer);
        }
    }, [isAddEditDialogOpen, isDeleteDialogOpen]);


    const saveFilm = (film) => {
        if (selectedFilm) {
            setSelectedFilm(null);
            props.updateFilm(film);
        } else {
            props.addFilm(film);
        }
        props.loadFilms();
        setAddEditDialogOpen(false);
    }

    const deleteFilm = (film) => {
        setSelectedFilm(null);
        props.deleteFilm(film);
        props.loadFilms(props.filmViewer);
        setDeleteDialogOpen(false);
    }

    const onAddFilm = () => {
        setSelectedFilm(null);
        setAddEditDialogOpen(true);
    }

    const onEditFilm = (film) => {
        setSelectedFilm(film);
        setAddEditDialogOpen(true);
    }

    const onDeleteFilm = (film) => {
        setSelectedFilm(film);
        setDeleteDialogOpen(true);
    }

    return (
        <>
            <FilmViewer
                films={props.films}
                genres={props.genres}
                onAddFilm={onAddFilm}
                onEditFilm={onEditFilm}
                onDeleteFilm={onDeleteFilm}
            />
            {
                isAddEditDialogOpen &&
                <Suspense fallback={<Loading/>}>
                    <AddEditFilmDialog
                        film={selectedFilm}
                        genres={props.genres}
                        onSave={saveFilm}
                        onClose={() => setAddEditDialogOpen(false)}/>
                </Suspense>
            }
            {
                isDeleteDialogOpen &&
                <Suspense fallback={<Loading/>}>
                    <DeleteDialog
                        film={selectedFilm}
                        onDelete={deleteFilm}
                        onClose={() => setDeleteDialogOpen(false)}/>
                </Suspense>
            }
        </>
    );
}

function mapStateToProps(state) {
    const {films, genres, filmViewer} = state;

    return {films, filmViewer, genres};
}

function mapDispatchToProps(dispatch) {
    return {
        loadFilms: params => dispatch(loadFilms(params)),
        addFilm: film => dispatch(addFilm(film)),
        updateFilm: film => dispatch(updateFilm(film)),
        deleteFilm: film => dispatch(deleteFilm(film))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmViewerContainer);
