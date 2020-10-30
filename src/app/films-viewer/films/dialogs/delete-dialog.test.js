import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { useDispatch } from 'react-redux';
import DeleteDialog from './delete-dialog';

import {
  setConfirmationDialog,
  setSelectedFilm,
  setResultPopup,
  deleteFilm,
} from '../../../store';

jest.mock('../../../store', () => ({
  deleteFilm: jest.fn(),
  loadFilms: jest.fn(),
  selectDialogs: jest.fn(() => ({
    confirmationDialog: {
      title: 'Title',
      description: 'Description',
    },
  })),
  selectSelectedFilm: jest.fn().mockReturnValue({
    id: 1234,
    title: 'Film Title',
    release_date: '1998-09-12',
    poster_path: 'http://test.com',
    genres: [],
    overview: 'Some text',
    runtime: 123,
    vote_average: 8,
  }),
  setConfirmationDialog: jest.fn(),
  setResultPopup: jest.fn(),
  setSelectedFilm: jest.fn(),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((selector) => selector()),
  useDispatch: jest.fn(() => mockDispatch),
}));

describe('DeleteDialog', () => {
  it('should init correctly', () => {
    render(<DeleteDialog />);

    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
  });

  it('should correctly set setConfirmationDialog on dialog close', () => {
    const { container } = render(<DeleteDialog />);

    const close = container.querySelector('.DialogCloseMark');

    expect(close).toBeInTheDocument();
    userEvent.click(close);

    expect(useDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
    expect(setConfirmationDialog).toHaveBeenCalledWith(null);
  });

  it('should correctly delete film', () => {
    deleteFilm.mockImplementation((f, s) => {
      s(mockDispatch);
    });

    render(<DeleteDialog />);

    const save = screen.getByText(/confirm/i);

    expect(save).toBeInTheDocument();

    userEvent.click(save);
    expect(useDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
    expect(deleteFilm).toHaveBeenCalled();
    expect(setResultPopup).toHaveBeenCalled();
    expect(setConfirmationDialog).toHaveBeenCalledWith(null);
    expect(setSelectedFilm).toHaveBeenCalledWith(null);
  });

  it('should correctly show error', () => {
    deleteFilm.mockImplementation((f, s, e) => {
      e(mockDispatch);
    });

    render(<DeleteDialog />);

    const save = screen.getByText(/confirm/i);

    expect(save).toBeInTheDocument();

    userEvent.click(save);
    expect(useDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
    expect(deleteFilm).toHaveBeenCalled();
    expect(setResultPopup).toHaveBeenCalled();
    expect(setConfirmationDialog).toHaveBeenCalledWith(null);
    expect(setSelectedFilm).toHaveBeenCalledWith(null);
  });
});
