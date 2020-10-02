import {deleteFilm, loadFilms, setConfirmationDialog, setResultPopup, setSelectedFilm} from "../../../store/slices";
import ConfirmationDialog from "../../../../general/components/confirmation-dialog/confirmation-dialog";
import {selectDialogs, selectSelectedFilm} from "../../../store/selectors";
import {useDispatch, useSelector} from "react-redux";
import React from "react";

export default function DeleteDialog() {
    const selectedFilm = useSelector(selectSelectedFilm);
    const dialogs = useSelector(selectDialogs);
    const dispatch = useDispatch();

    const onDelete = () => {
        dispatch(deleteFilm(selectedFilm,
            (dispatch) => {
                dispatch(setResultPopup({
                    title: 'Congratulations!',
                    description: `The movie has been deleted successfully`,
                    type: 'Success'
                }));
                dispatch(loadFilms());
                dispatch(setSelectedFilm(null));
                dispatch(setConfirmationDialog(null));
            },
            (dispatch, err) => {
                dispatch(setResultPopup({
                    title: 'Oops!',
                    description: `Can't delete movie. ${err}`,
                    type: 'Failure'
                }));
                dispatch(setSelectedFilm(null));
                dispatch(setConfirmationDialog(null));
            }));

    }

    return <ConfirmationDialog
        title={dialogs.confirmationDialog.title}
        description={dialogs.confirmationDialog.description}
        onConfirm={onDelete}
        onClose={() => dispatch(setConfirmationDialog(null))}/>
}
