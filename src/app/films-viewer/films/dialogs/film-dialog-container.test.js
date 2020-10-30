import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import FilmDialogContainer from './film-dialog-container';

import { selectDialogs } from '../../../store';

jest.mock('../../../store', () => ({
  setResultPopup: jest.fn(() => 'test'),
  selectDialogs: jest.fn(() => ({})),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((selector) => selector()),
  useDispatch: jest.fn(() => mockDispatch),
}));

jest.mock('./add-edit-dialog/add-edit-film-dialog', () => () => (
  <div className="AddEditDialogTest" />
));
jest.mock('./delete-dialog', () => () => (
  <div className="DeleteDialogTest" />
));
jest.mock('../../../../general/components/result-popup/result-popup', () => (props) => (
  <div className="PopupTest" onClick={props.onClose} />
));

describe('FilmDialogContainer', () => {
  it('should init correctly', () => {
    const { container } = render(<FilmDialogContainer />);

    expect(container.querySelector('.Loading')).toBeNull();
    expect(container.querySelector('.AddEditDialogTest')).toBeNull();
    expect(container.querySelector('.DeleteDialogTest')).toBeNull();
    expect(container.querySelector('.PopupTest')).toBeNull();
  });

  it('should correctly display add edit dialog', async () => {
    selectDialogs.mockReturnValue({
      isAddEditDialogOpen: true,
    });
    const { container } = render(<FilmDialogContainer />);
    expect(container.querySelector('.Loading')).toBeInTheDocument();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(container.querySelector('.AddEditDialogTest')).toBeInTheDocument();
    expect(container.querySelector('.DeleteDialogTest')).toBeNull();
    expect(container.querySelector('.PopupTest')).toBeNull();
  });

  it('should correctly display popup', async () => {
    selectDialogs.mockReturnValue({
      resultPopup: {},
    });
    const { container } = render(<FilmDialogContainer />);
    expect(container.querySelector('.Loading')).toBeInTheDocument();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(container.querySelector('.AddEditDialogTest')).toBeNull();
    expect(container.querySelector('.DeleteDialogTest')).toBeNull();
    const popup = container.querySelector('.PopupTest');
    expect(popup).toBeInTheDocument();
    userEvent.click(popup);
    expect(mockDispatch).toHaveBeenCalledWith('test');
  });

  it('should correctly display delete dialog', async () => {
    selectDialogs.mockReturnValue({
      confirmationDialog: {},
    });
    const { container } = render(<FilmDialogContainer />);
    expect(container.querySelector('.Loading')).toBeInTheDocument();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(container.querySelector('.AddEditDialogTest')).toBeNull();
    expect(container.querySelector('.DeleteDialogTest')).toBeInTheDocument();
    expect(container.querySelector('.PopupTest')).toBeNull();
  });
});
