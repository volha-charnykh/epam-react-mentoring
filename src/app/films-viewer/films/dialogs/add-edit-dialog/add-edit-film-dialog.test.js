import {render, screen} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import AddEditFilmDialog from "./add-edit-film-dialog";
import { useSelector, useDispatch } from 'react-redux';
import userEvent from "@testing-library/user-event";
import {addFilm, loadFilms, setAddEditDialogOpen} from "../../../../store/slices";

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

describe('AddEditFilmDialog', () => {

    it('should correctly set setAddEditDialogOpen on close', () => {
        render(<AddEditFilmDialog/>);

        const reset = screen.getByText(/reset/i);

        expect(reset).toBeInTheDocument();

        userEvent.click(reset);
        expect(mockDispatch).toHaveBeenCalledWith(setAddEditDialogOpen(false))
    });

    it('should correctly set setAddEditDialogOpen on close', () => {
        render(<AddEditFilmDialog/>);

        const submit = screen.getByText(/submit/i);

        expect(submit).toBeInTheDocument();

        userEvent.click(submit);
        expect(mockDispatch).toHaveBeenCalled()
    });
})
