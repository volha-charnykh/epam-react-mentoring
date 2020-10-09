import React from "react";
import Logo from "./logo";
import {render} from '@testing-library/react';

describe('Logo', () => {
    it('renders Logo snapshot', () => {
        const {asFragment} = render(<Logo/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
