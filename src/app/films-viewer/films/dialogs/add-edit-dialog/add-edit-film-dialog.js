import React, { useCallback } from 'react';
import '../../../../../general/styles/dialog.scss';
import '../../../../../general/styles/buttons.scss';
import '../../../../../general/styles/form.scss';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../../../../../general/components/dialog/dialog';
import {
  addFilm,
  loadFilms,
  selectGenres,
  selectSelectedFilm,
  setAddEditDialogOpen,
  setResultPopup,
  setSelectedFilm,
  updateFilm,
} from '../../../../store';
import AddEditFilmForm from './add-edit-film-form';

export default function AddEditFilmDialog() {
  const film = useSelector(selectSelectedFilm);
  const genres = useSelector(selectGenres);
  const dispatch = useDispatch();

  const saveFilm = (f) => {
    const onSuccess = (dis) => {
      dis(loadFilms());
      dis(setAddEditDialogOpen(false));
      dis(setResultPopup({
        title: 'Congratulations!',
        description: `The movie has been ${film ? 'edited' : 'added'} successfully`,
        type: 'Success',
      }));
      dis(setSelectedFilm(null));
    };
    const onError = (dis, err) => {
      dis(setAddEditDialogOpen(false));
      dis(setResultPopup({
        title: 'Oops!',
        description: `Can't delete movie. ${err}`,
        type: 'Failure',
      }));
      dis(setSelectedFilm(null));
    };
    if (film) {
      dispatch(updateFilm(f, onSuccess, onError));
    } else {
      dispatch(addFilm(f, onSuccess, onError));
    }
  };

  const onDialogClose = useCallback(() => dispatch(setAddEditDialogOpen(false)),
    [dispatch, setAddEditDialogOpen()]);

  return (
    <Dialog onClose={onDialogClose}>
      <AddEditFilmForm
        film={film}
        genres={genres}
        onSave={saveFilm}
        onClose={onDialogClose}
      />
    </Dialog>
  );
}
