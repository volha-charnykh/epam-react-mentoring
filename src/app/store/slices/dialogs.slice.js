import { createSlice } from '@reduxjs/toolkit';

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState: {
    isAddEditDialogOpen: false,
    confirmationDialog: null,
    resultPopup: null,
  },
  reducers: {
    setAddEditDialogOpen: (state, action) => ({ ...state, isAddEditDialogOpen: action.payload }),
    setConfirmationDialog: (state, action) => ({ ...state, confirmationDialog: action.payload }),
    setResultPopup: (state, action) => ({ ...state, resultPopup: action.payload }),
  },
});

export const { setAddEditDialogOpen, setConfirmationDialog, setResultPopup } = dialogsSlice.actions;

export const selectDialogs = (state) => state.dialogs;

export default dialogsSlice.reducer;
