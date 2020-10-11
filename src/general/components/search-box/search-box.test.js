import {render, screen} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import SearchBox from "./search-box";
import {fireEvent} from "@testing-library/dom";

describe('SearchBox', () => {
    const initString = "TestString";
    const newString = "NewTestString";

    it('should correctly set init state', () => {
        render(<SearchBox
            searchString={initString}
            searchButtonLabel="Search button"
            search={() => {
            }}/>);

        const input = screen.getByRole("textbox");
        const button = screen.getByText(/search button/i);

        expect(input).toBeInTheDocument();
        expect(input.value).toBe(initString);
        expect(button).toBeInTheDocument();
    });

    it('should correctly set new search string', async(done) => {
        render(<SearchBox
            searchString={initString}
            searchButtonLabel="Search button"
            search={(str) => {
                expect(str).toBe(newString);
                done();
            }}/>);

        const input = screen.getByRole("textbox");
        const button = screen.getByText(/search button/i);

        await userEvent.clear(input);
        await userEvent.type(input, newString);

        expect(input.value).toBe(newString);
        userEvent.click(button);
    });
});
