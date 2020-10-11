import {render, screen} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import FilmsList from "./films-list";

jest.mock('../../../store', () => ({
    selectFilms: jest.fn(() => ([{id: 1, name: 'Test1'}])),
    loadFilms: jest.fn(),
    setActiveGenre: jest.fn(),
    setAddEditDialogOpen: jest.fn(),
    setConfirmationDialog: jest.fn(),
    setSearchString: jest.fn(),
    setSelectedFilm: jest.fn(),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    useSelector: jest.fn().mockImplementation(selector => selector()),
    useDispatch: jest
        .fn(() => mockDispatch)
}));

const mockHistory = {push: jest.fn()};

jest.mock('react-router-dom', () => ({
    useHistory: jest.fn(() => mockHistory),
    useLocation: jest.fn(() => ({search:''}))
}));
jest.mock("./film-item/film-item", () => (props) =>
    (<><div className="TestItem"
        onClick={() => props.clickHandler(props.film)}> </div>
        {props.actions.map(el => (
            <div onClick={() => el.handle(props.film)}>{el.title}</div>
        ))}
        </>));

import {selectFilms,setAddEditDialogOpen, setSelectedFilm, setConfirmationDialog} from "../../../store";

describe('FilmsList', () => {

    it('should correctly init', () => {
        const {container} = render(<FilmsList/>);
        expect(container.querySelector('.TestItem')).toBeInTheDocument();
    });

    it('should correctly navigate to no films', () => {
        selectFilms.mockReturnValueOnce([])
        render(<FilmsList/>);
        expect(mockHistory.push).toHaveBeenCalledWith('/no-films');
    });

    it('should correctly select film', () => {
        window.scrollTo = jest.fn();
        const {container} = render(<FilmsList/>);
        const tab = container.querySelector('.TestItem');
        userEvent.click(tab);

        expect(mockHistory.push).toHaveBeenCalledWith({
            pathname: `/films/1`,
            search: ''
        })

        expect(window.scrollTo).toHaveBeenCalled()
    });

    it('should correctly select handle edit', () => {
        render(<FilmsList/>);
        const edit = screen.getByText(/edit/i);
        userEvent.click(edit);

        expect(mockDispatch).toHaveBeenCalled()
        expect(setSelectedFilm).toHaveBeenCalled()
        expect(setAddEditDialogOpen).toHaveBeenCalledWith(true)
    });

    it('should correctly select handle delete', () => {
        render(<FilmsList/>);
        const edit = screen.getByText(/delete/i);
        userEvent.click(edit);

        expect(mockDispatch).toHaveBeenCalled()
        expect(setSelectedFilm).toHaveBeenCalled()
        expect(setConfirmationDialog).toHaveBeenCalled()
    });
});
