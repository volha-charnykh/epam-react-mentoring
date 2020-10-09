import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {usePrevState} from "./prev-state";
import React from 'react';

function UsePrevStateComponent() {
    const [state, setStateAndPrev, prevState] = usePrevState(0);

    return (<>
        <div>Past: {prevState}</div>
        <div>Present: {state}</div>
        <button onClick={() => setStateAndPrev(state + 1)}>
            Change state
        </button>
    </>);
}

describe('usePrevState hook ', () => {
    beforeEach(() => render(<UsePrevStateComponent/>));

    it('should correct initial previous and current state', () => {
        const present = screen.getByText(/present/i);
        const past = screen.getByText(/past/i);

        expect(present).toBeInTheDocument();
        expect(past).toBeInTheDocument();
        expect(past).toHaveTextContent(`Past:`);
        expect(present).toHaveTextContent(`Present: 0`);
    });

    it('should change previous and current state', () => {
        const present = screen.getByText(/present/i);
        const past = screen.getByText(/past/i);
        const changeState = screen.getByText(/change state/i);

        userEvent.click(changeState)

        expect(past).toHaveTextContent(`Past: 0`);
        expect(present).toHaveTextContent(`Present: 1`);
    });
});
