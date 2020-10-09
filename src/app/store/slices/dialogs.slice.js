import {createSlice} from "@reduxjs/toolkit";

export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState: {
        isAddEditDialogOpen: false,
        confirmationDialog: null,
        resultPopup: null
    },
    reducers: {
        setAddEditDialogOpen: (state, action) => {
            return {...state, isAddEditDialogOpen: action.payload}
        },
        setConfirmationDialog: (state, action) => {
            return {...state, confirmationDialog: action.payload}
        },
        setResultPopup: (state, action) => {
            return {...state, resultPopup: action.payload}
        },
    }
});

export const {setAddEditDialogOpen, setConfirmationDialog, setResultPopup} = dialogsSlice.actions;

export const selectDialogs = state => state.dialogs;

export default dialogsSlice.reducer;
