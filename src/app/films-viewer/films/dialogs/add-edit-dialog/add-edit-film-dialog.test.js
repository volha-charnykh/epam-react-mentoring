import {render, screen} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import AddEditFilmDialog from "./add-edit-film-dialog";
import userEvent from "@testing-library/user-event";

jest.mock('../../../../store', () => ({
    selectSelectedFilm: jest.fn(),
    selectGenres: jest.fn().mockReturnValue(['Genre1', 'Genre2', 'Genre3', 'Genre4', 'Genre5']),
    addFilm: jest.fn(),
    loadFilms: jest.fn(),
    setAddEditDialogOpen: jest.fn(),
    setResultPopup: jest.fn(),
    setSelectedFilm: jest.fn(),
    updateFilm: jest.fn(),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    useSelector: jest.fn().mockImplementation(selector => selector()),
    useDispatch: jest.fn(() => mockDispatch)
}));

jest.mock('./add-edit-film-form', () => { return (props)=> (
    <div>
        <button onClick={() => props.onClose()}>Reset</button>
        <button onClick={() => props.onSave(props.film || {})}>Save</button>
    </div>
)})

import {
    setAddEditDialogOpen,
    setSelectedFilm,
    setResultPopup,
    updateFilm,
    selectSelectedFilm,
    addFilm
} from "../../../../store";
import {useDispatch} from "react-redux";

describe('AddEditFilmDialog', () => {

    it('should correctly set setAddEditDialogOpen on close', () => {
        render(<AddEditFilmDialog/>);

        const reset = screen.getByText(/reset/i);

        expect(reset).toBeInTheDocument();

        userEvent.click(reset);
        expect(useDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalled();
        expect(setAddEditDialogOpen).toHaveBeenCalledWith(false);
    });

    it('should correctly set setAddEditDialogOpen on dialog close', () => {
        const {container} = render(<AddEditFilmDialog/>);

        const close = container.querySelector('.DialogCloseMark');

        expect(close).toBeInTheDocument();
        userEvent.click(close);

        expect(useDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalled();
        expect(setAddEditDialogOpen).toHaveBeenCalledWith(false);
    });

    it('should correctly add new film', () => {
        addFilm.mockImplementation((f, s, e) => {
            s(mockDispatch);
        })

        render(<AddEditFilmDialog/>);

        const save = screen.getByText(/save/i);

        expect(save).toBeInTheDocument();

        userEvent.click(save);
        expect(useDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalled();
        expect(addFilm).toHaveBeenCalled();
        expect(setResultPopup).toHaveBeenCalled();
        expect(setAddEditDialogOpen).toHaveBeenCalledWith(false);
        expect(setSelectedFilm).toHaveBeenCalledWith(null);
    });

    it('should correctly update film', () => {
        updateFilm.mockImplementation((f, s, e) => {
            s(mockDispatch);
        })

        selectSelectedFilm.mockReturnValueOnce({
            id: 1234,
            title: 'Film Title',
            release_date: '1998-09-12',
            poster_path: 'http://test.com',
            genres: [],
            overview: 'Some text',
            runtime: 123,
            vote_average: 8
        })
        render(<AddEditFilmDialog/>);

        const save = screen.getByText(/save/i);

        expect(save).toBeInTheDocument();

        userEvent.click(save);
        expect(useDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalled();
        expect(updateFilm).toHaveBeenCalled();
        expect(setResultPopup).toHaveBeenCalled();
        expect(setAddEditDialogOpen).toHaveBeenCalledWith(false);
        expect(setSelectedFilm).toHaveBeenCalledWith(null);
    });

    it('should correctly show error', () => {
        addFilm.mockImplementation((f, s, e) => {
            e(mockDispatch);
        })

        render(<AddEditFilmDialog/>);

        const save = screen.getByText(/save/i);

        expect(save).toBeInTheDocument();

        userEvent.click(save);
        expect(useDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalled();
        expect(addFilm).toHaveBeenCalled();
        expect(setResultPopup).toHaveBeenCalled();
        expect(setAddEditDialogOpen).toHaveBeenCalledWith(false);
        expect(setSelectedFilm).toHaveBeenCalledWith(null);
    });
});
