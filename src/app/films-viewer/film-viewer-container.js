import React, {Suspense, useEffect, useState} from 'react';
import FilmViewer from "./films-viewer";
import Loading from "../../general/components/loading/loading";
import {usePrevState} from "../../general/hooks/prev-state";
import {connect} from "react-redux";
import {addFilm, loadFilms, updateFilm, deleteFilm} from "../store/actions/films";

const AddEditFilmDialog = React.lazy(() => import("./add-edit-dialog/add-edit-film-dialog"));
const DeleteDialog = React.lazy(() => import("../../general/components/confirmation-dialog/confirmation-dialog"));
const ResultPopup = React.lazy(() => import("../../general/components/result-popup/result-popup"));


function FilmViewerContainer(props) {
    const [isAddEditDialogOpen, setAddEditDialogOpen, wasAddEditDialogOpen] = usePrevState(false);
    const [deleteDialog, setDeleteDialog, wasDeleteDialog] = usePrevState(null);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [resultPopup, setResultPopup] = useState(null);

    useEffect(() => {
        props.loadFilms(props.filmViewer);
    }, []);

    useEffect(() => {
        if ((wasAddEditDialogOpen && !isAddEditDialogOpen) ||
            (wasDeleteDialog && !deleteDialog)) {
            props.loadFilms(props.filmViewer);
        }
    }, [isAddEditDialogOpen, deleteDialog]);


    const saveFilm = (film) => {
        if (selectedFilm) {
            setSelectedFilm(null);
            props.updateFilm(film);
        } else {
            props.addFilm(film);
        }
        props.loadFilms();
        setAddEditDialogOpen(false);
        setResultPopup({
            title: 'Congratulations!',
            description: `The movie has been ${!!selectedFilm ? 'edited' : 'added'} successfully`,
            type: 'Success'
        });
        setSelectedFilm(null);
    }

    const deleteFilm = () => {
        props.deleteFilm(selectedFilm);
        setResultPopup({
            title: 'Congratulations!',
            description: `The movie has been deleted successfully`,
            type: 'Success'
        });
        props.loadFilms(props.filmViewer);
        setSelectedFilm(null);
        setDeleteDialog(null);
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
        setDeleteDialog({
            title: 'Delete Movie',
            description: 'Are you sure you want to delete this movie?'
        });
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
                !!resultPopup &&
                <Suspense fallback={<Loading/>}>
                    <ResultPopup
                        title={resultPopup.title}
                        description={resultPopup.description}
                        type={resultPopup.type}
                        onClose={() => setResultPopup(null)}/>
                </Suspense>
            }
            {
                !!deleteDialog &&
                <Suspense fallback={<Loading/>}>
                    <DeleteDialog
                        title={deleteDialog.title}
                        description={deleteDialog.description}
                        onConfirm={deleteFilm}
                        onClose={() => setDeleteDialog(null)}/>
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
