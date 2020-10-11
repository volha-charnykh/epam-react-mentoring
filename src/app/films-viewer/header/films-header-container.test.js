import {render, screen} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import FilmsHeaderContainer from "./films-header-container";
import userEvent from "@testing-library/user-event";
import {selectSearchParams} from "../../store";

jest.mock('../../store', () => ({
    selectSearchParams: jest.fn(() => ({})),
    setAddEditDialogOpen: jest.fn(() => 'open'),
    setSearchString: jest.fn(str => str)
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    useSelector: jest.fn().mockImplementation(selector => selector()),
    useDispatch: jest.fn(() => mockDispatch),
}));
const mockHistory = {push: jest.fn()};
jest.mock("react-router-dom", () => ({
    useHistory: jest.fn(() => mockHistory),
    useLocation: () => ({search: {}}),
    useRouteMatch: () => ({}),
    Redirect: jest.fn((props) => (props.to || null)),
    Route: (props) => {
        if (props.render) {
            return props.render()
        }
        return props.children || null;
    },
    Switch: (props) => (props.children)
}))

jest.mock("./film-details-header/film-details-header", () => () => (
    <div className="FilmDetailsHeaderTest">

    </div>
));
jest.mock("./viewer-header/viewer-header", () => (props) => (
    <div className="ViewerHeaderTest">
        <div onClick={props.onAddFilm}>Add</div>
        <div onClick={() => props.updateSearchStr(props.searchString)}>Search</div>
    </div>
));

describe('FilmsHeaderContainer', () => {

    it('should init correctly', async () => {
        const {container} = render(<FilmsHeaderContainer/>);

        expect(container.querySelector('.Loading')).toBeInTheDocument();

        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(container.querySelector('.ViewerHeaderTest')).toBeInTheDocument();
        expect(container.querySelector('.FilmDetailsHeaderTest')).toBeInTheDocument();

    });

    it('should init update search string', async () => {
        selectSearchParams.mockReturnValueOnce({searchString: 'teststring'})
        const {container} = render(<FilmsHeaderContainer/>);
        if (container.querySelector('.Loading')) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        const search = screen.getByText('Search');
        userEvent.click(search);
        expect(mockDispatch).toHaveBeenCalledWith('teststring');
        expect(mockHistory.push).toHaveBeenCalled()

    });

    it('should init reset search string', async() => {
        const {container} = render(<FilmsHeaderContainer/>);
        if (container.querySelector('.Loading')) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        const search = screen.getByText('Search');
        userEvent.click(search);
        expect(mockDispatch).toHaveBeenCalledWith(null);
        expect(mockHistory.push).toHaveBeenCalled()

    });

    it('should init update open add dialog', async() => {
        const {container} = render(<FilmsHeaderContainer/>);
        if (container.querySelector('.Loading')) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        const add = screen.getByText('Add');
        userEvent.click(add);
        expect(mockDispatch).toHaveBeenCalledWith('open')

    });
});
