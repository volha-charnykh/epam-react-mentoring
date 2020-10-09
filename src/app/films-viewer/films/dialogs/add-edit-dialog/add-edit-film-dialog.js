import React from 'react';
import '../../../../../general/styles/dialog.scss';
import '../../../../../general/styles/buttons.scss';
import '../../../../../general/styles/form.scss';
import Dialog from "../../../../../general/components/dialog/dialog";
import {useDispatch, useSelector} from "react-redux";
import {
    addFilm,
    loadFilms,
    selectGenres,
    selectSelectedFilm,
    setAddEditDialogOpen,
    setResultPopup,
    setSelectedFilm,
    updateFilm
} from "../../../../store";
import AddEditFilmForm from "./add-edit-film-form";


export default function AddEditFilmDialog() {
    const film = useSelector(selectSelectedFilm);
    const genres = useSelector(selectGenres);
    const dispatch = useDispatch();

    const saveFilm = (f) => {
        const onSuccess = (dispatch) => {
            dispatch(loadFilms());
            dispatch(setAddEditDialogOpen(false));
            dispatch(setResultPopup({
                title: 'Congratulations!',
                description: `The movie has been ${!!film ? 'edited' : 'added'} successfully`,
                type: 'Success'
            }));
            dispatch(setSelectedFilm(null));
        }
        const onError = (dispatch, err) => {
            dispatch(setAddEditDialogOpen(false));
            dispatch(setResultPopup({
                title: 'Oops!',
                description: `Can't delete movie. ${err}`,
                type: 'Failure'
            }));
            dispatch(setSelectedFilm(null));
        }
        if (film) {
            dispatch(updateFilm(f, onSuccess, onError));
        } else {
            dispatch(addFilm(f, onSuccess, onError));
        }
    }

    return (
        <Dialog onClose={() => dispatch(setAddEditDialogOpen(false))}>
            <AddEditFilmForm
                film={film}
                genres={genres}
                onSave={saveFilm}
                onClose={() => dispatch(setAddEditDialogOpen(false))}
            />
        </Dialog>
    );
}
