import reducer, {
  selectDialogs, setAddEditDialogOpen, setConfirmationDialog, setResultPopup,
} from './dialogs.slice';

describe('dialog slice', () => {
  const initialState = {
    isAddEditDialogOpen: false,
    confirmationDialog: null,
    resultPopup: null,
  };
  const config = { someField: 'someValue', anotherField: 'anotherValue' };

  describe('reducer and actions', () => {
    it('should return the initial state on first run', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should properly set the state when update isAddEditDialogOpen', () => {
      let nextState = reducer(initialState, setAddEditDialogOpen(true));
      expect(nextState).toEqual({ ...initialState, isAddEditDialogOpen: true });

      nextState = reducer(nextState, setAddEditDialogOpen(false));
      expect(nextState).toEqual({ ...initialState, isAddEditDialogOpen: false });
    });

    it('should properly set the state when update confirmationDialog', () => {
      let nextState = reducer(initialState, setConfirmationDialog(config));
      expect(nextState).toEqual({ ...initialState, confirmationDialog: config });

      nextState = reducer(nextState, setConfirmationDialog(null));
      expect(nextState).toEqual({ ...initialState, confirmationDialog: null });
    });

    it('should properly set the state when update resultPopup', () => {
      let nextState = reducer(initialState, setResultPopup(config));
      expect(nextState).toEqual({ ...initialState, resultPopup: config });

      nextState = reducer(nextState, setResultPopup(null));
      expect(nextState).toEqual({ ...initialState, resultPopup: null });
    });
  });

  describe('selector', () => {
    it('should return dialogs data', () => {
      const store = {
        ...config, dialogs: initialState,
      };
      expect(selectDialogs(store)).toEqual(initialState);
    });
  });
});
