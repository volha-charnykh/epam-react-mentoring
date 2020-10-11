import {render, screen} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import ThreeDotMenu from "./three-dot-menu";

describe('ThreeDotMenu', () => {
    const menuItems = [{
        id: 1, title: 'Item1'
    }, {
        id: 2, title: 'Item2'
    }, {
        id: 3, title: 'Item3'
    }, {
        id: 4, title: 'Item4'
    }];

    it('should correctly set init state', () => {
        const {container} = render(<ThreeDotMenu
            items={menuItems}
            onItemSelected={() => {
            }}/>);

        expect(container.querySelector('.ThreeDots')).toBeInTheDocument();

    });

    it('should correctly open menu', () => {
        const {container} = render(<ThreeDotMenu
            items={menuItems}
            onItemSelected={() => {
            }}/>);

        const menu = container.querySelector('.ThreeDots');

        userEvent.click(menu);

        menuItems.forEach((el) => {
            expect(screen.getByText(el.title)).toBeInTheDocument()
        });
    });

    it('should correctly select item', (done) => {
        const {container} = render(<ThreeDotMenu
            items={menuItems}
            onItemSelected={(item) => {
                expect(item).toBe(menuItems[3])
                done();
            }}/>);

        const menu = container.querySelector('.ThreeDots');

        userEvent.click(menu);

        const item = screen.getByText(menuItems[3].title);
        userEvent.click(item);
    });
});
