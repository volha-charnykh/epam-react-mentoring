import React, { Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../general/components/loading/loading';
import { selectDialogs, setResultPopup } from '../../../store';

const AddEditFilmDialog = React.lazy(() => import('./add-edit-dialog/add-edit-film-dialog'));
const DeleteDialog = React.lazy(() => import('./delete-dialog'));
const ResultPopup = React.lazy(() => import('../../../../general/components/result-popup/result-popup'));

export default function FilmDialogContainer() {
  const dialogs = useSelector(selectDialogs);
  const dispatch = useDispatch();

  const onResultPopupClose = useCallback(() => dispatch(setResultPopup(null)),
    [dispatch, setResultPopup()]);

  return (
    <>
      {
                dialogs.isAddEditDialogOpen
                && (
                <Suspense fallback={<Loading />}>
                  <AddEditFilmDialog />
                </Suspense>
                )
            }
      {
                !!dialogs.resultPopup
                && (
                <Suspense fallback={<Loading />}>
                  <ResultPopup
                    title={dialogs.resultPopup.title}
                    description={dialogs.resultPopup.description}
                    type={dialogs.resultPopup.type}
                    onClose={onResultPopupClose}
                  />
                </Suspense>
                )
            }
      {
                !!dialogs.confirmationDialog
                && (
                <Suspense fallback={<Loading />}>
                  <DeleteDialog />
                </Suspense>
                )
            }
    </>
  );
}
