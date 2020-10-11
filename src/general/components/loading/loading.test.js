import {render} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Loading from "./loading";

describe('Layout', () => {
    it('should correctly set init state', () => {
        const {container} = render(<Loading/>);

        const loading = container.querySelector('.Loading');
        const dialogBackground = container.querySelector('.DialogBackground');

        expect(loading).toBeInTheDocument();
        expect(dialogBackground).toBeInTheDocument();
    });
})
