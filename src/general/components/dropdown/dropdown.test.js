import {render, screen} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Dropdown from "./dropdown";
import userEvent from "@testing-library/user-event";

describe('Dropdown', () => {
    const dropdownItems = [{
        id: 1,
        title: 'Item1'
    }, {
        id: 2,
        title: 'Item2'
    }, {
        id: 3, title: 'Item3'
    }];

    it('should correctly set init state', () => {
        const {container} = render(<Dropdown
            items={dropdownItems}
            selected={dropdownItems[1]}
            hideTriangle={true}
            onItemSelected={() => {
            }}/>);

        const dropdownButton = container.querySelector('.DropdownButton');
        const panel = container.querySelector('.Panel');

        expect(dropdownButton).toBeInTheDocument();
        expect(panel).toBeNull();
        expect(screen.getByText(dropdownItems[1].title)).toBeInTheDocument();
        expect(container.querySelector('.DropdownButtonTriangle')).toBeNull();
    });

    it('should correctly open', () => {
        const {container} = render(<Dropdown
            items={dropdownItems}
            selected={dropdownItems[1]}
            onItemSelected={() => {
            }}/>);

        const dropdownButton = container.querySelector('.DropdownButton');

        expect(container.querySelector('.DropdownButtonTriangle')).toBeInTheDocument();

        userEvent.click(dropdownButton);

        expect(container.querySelector('.Panel')).toBeInTheDocument();
        dropdownItems.forEach(el => {
            expect(screen.queryAllByText(el.title)[0]).toBeInTheDocument();
        })
    });

    it('should correctly select', (done) => {
        const {container} = render(<Dropdown
            items={dropdownItems}
            selected={dropdownItems[1]}
            onItemSelected={(item) => {
                expect(item).toEqual(dropdownItems[2])
                done()
            }}/>);

        const dropdownButton = container.querySelector('.DropdownButton');

        userEvent.click(dropdownButton);

        expect(container.querySelector('.Panel')).toBeInTheDocument();

        const item = screen.queryByText(dropdownItems[2].title);

        userEvent.click(item);
    });
})
