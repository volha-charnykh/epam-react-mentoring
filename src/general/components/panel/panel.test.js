import {render} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Panel from "./panel";
import userEvent from "@testing-library/user-event";

describe('Panel', () => {

    it('should correctly set init state', () => {
        const {container} = render(<Panel>
            <div className="TestClass">
            </div>
        </Panel>);

        expect(container.querySelector('.TestClass')).toBeInTheDocument();

    });

    it('should correctly close', (done) => {
        const {container} = render(<Panel
            closable={true}
            onClose={() => {
                expect(true).toBeTruthy();
                done();
            }}>
            <div className="TestClass">
            </div>
        </Panel>);

        const close = container.querySelector('.PanelCloseMark');

        expect(close).toBeInTheDocument();

        userEvent.click(close);

    });
})
