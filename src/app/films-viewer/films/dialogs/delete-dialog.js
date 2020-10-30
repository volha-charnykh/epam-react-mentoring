import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback } from 'react';
import {
  deleteFilm,
  loadFilms,
  selectDialogs,
  selectSelectedFilm,
  setConfirmationDialog,
  setResultPopup,
  setSelectedFilm,
} from '../../../store';
import ConfirmationDialog from '../../../../general/components/confirmation-dialog/confirmation-dialog';

export default function DeleteDialog() {
  const selectedFilm = useSelector(selectSelectedFilm);
  const dialogs = useSelector(selectDialogs);
  const dispatch = useDispatch();

  const onDialogClose = useCallback(() => dispatch(setConfirmationDialog(null)),
    [dispatch, setConfirmationDialog]);

  const onDelete = () => {
    dispatch(deleteFilm(selectedFilm,
      (disp) => {
        disp(setResultPopup({
          title: 'Congratulations!',
          description: 'The movie has been deleted successfully',
          type: 'Success',
        }));
        disp(loadFilms());
        disp(setSelectedFilm(null));
        disp(setConfirmationDialog(null));
      },
      (disp, err) => {
        disp(setResultPopup({
          title: 'Oops!',
          description: `Can't delete movie. ${err}`,
          type: 'Failure',
        }));
        disp(setSelectedFilm(null));
        disp(setConfirmationDialog(null));
      }));
  };

  return (
    <ConfirmationDialog
      title={dialogs.confirmationDialog.title}
      description={dialogs.confirmationDialog.description}
      onConfirm={onDelete}
      onClose={onDialogClose}
    />
  );
}
