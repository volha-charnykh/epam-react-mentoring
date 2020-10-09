import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {useToggle} from "./toggle";

function UseToggleComponent() {
    const [flag, toggle] = useToggle(false);

    return (<>
        {flag ? <div>ON</div> : <div>OFF</div>}
        <button onClick={() => toggle()}>
            Toggle
        </button>
    </>);
}

describe('useToggle hook ', () => {
    beforeEach(() => render(<UseToggleComponent/>));

    it('should correct initial state', () => {
        expect(screen.getByText(/off/i)).toBeInTheDocument();
        expect(screen.queryByText(/on/i)).toBeNull();
    });

    it('should changes state on one click', () => {
        const toggle = screen.getByText(/toggle/i);

        userEvent.click(toggle);

        expect(screen.getByText(/on/i)).toBeInTheDocument();
        expect(screen.queryByText(/off/i)).toBeNull();
    });

    it('should changes state on even number of clicks', () => {
        const toggle = screen.getByText(/toggle/i);

        for (let i = 0; i < 10; i++) {
            userEvent.click(toggle);
        }

        expect(screen.getByText(/off/i)).toBeInTheDocument();
        expect(screen.queryByText(/on/i)).toBeNull();
    });

    it('should changes state on odd number of clicks', () => {
        const toggle = screen.getByText(/toggle/i);

        for (let i = 0; i < 11; i++) {
            userEvent.click(toggle);
        }

        expect(screen.getByText(/on/i)).toBeInTheDocument();
        expect(screen.queryByText(/off/i)).toBeNull();
    });
});
