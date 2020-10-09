import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {useStateSelector} from "./state-selector";
import {fireEvent} from "@testing-library/dom";

function UseStateSelectorComponent() {
    const [selected, select] = useStateSelector();

    const handleSubmit = (event) => {
        event.preventDefault()
        const input = event.target.elements.selectValue
        select(input.value)
        input.value = ''
    }

    return (<>
        <div>State: {selected.join(', ')}</div>
        <div>Length: {selected.length}</div>

        <form onSubmit={handleSubmit}>
            <label htmlFor="selectValue">Value</label>
            <input type="text" id="selectValue" />
            <button type="submit">Select</button>
        </form>
    </>);
}

describe('useStateSelector hook ', () => {
    beforeEach(() => {
        render(<UseStateSelectorComponent/>);

    });

    it('should correct initial state', () => {
        const state = screen.getByText(/state/i);
        const length = screen.getByText(/length/i);

        expect(state).toBeInTheDocument();
        expect(length).toBeInTheDocument();
        expect(state).toHaveTextContent(`State:`);
        expect(length).toHaveTextContent(`Length: 0`);
    });

    it('should add item to state if it isn\'t there', () => {
        const select = screen.getByText(/select/i);
        const input = screen.getByLabelText(/value/i);
        const state = screen.getByText(/state/i);
        const length = screen.getByText(/length/i);

        fireEvent.change(input, { target: { value: 'one' } });
        userEvent.click(select);

        expect(state).toHaveTextContent(`State: one`);
        expect(length).toHaveTextContent(`Length: 1`);

        input.value = 'two';
        userEvent.click(select);

        expect(state).toHaveTextContent(`State: one, two`);
        expect(length).toHaveTextContent(`Length: 2`);

        input.value = 'three';
        userEvent.click(select);

        expect(state).toHaveTextContent(`State: one, two, three`);
        expect(length).toHaveTextContent(`Length: 3`);
    });

    it('should remove item from state if it is there', () => {
        const select = screen.getByText(/select/i);
        const input = screen.getByLabelText(/value/i);
        const state = screen.getByText(/state/i);
        const length = screen.getByText(/length/i);

        input.value = 'one';
        userEvent.click(select);

        expect(state).toHaveTextContent(`State: one`);
        expect(length).toHaveTextContent(`Length: 1`);

        input.value = 'two';
        userEvent.click(select);

        expect(state).toHaveTextContent(`State: one, two`);
        expect(length).toHaveTextContent(`Length: 2`);

        input.value = 'one';
        userEvent.click(select);

        expect(state).toHaveTextContent(`State: two`);
        expect(length).toHaveTextContent(`Length: 1`);
    });
});
