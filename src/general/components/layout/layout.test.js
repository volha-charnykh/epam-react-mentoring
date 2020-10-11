import {render} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Layout from "./layout";

describe('Layout', () => {
    it('should correctly set init state', () => {
        const {container} = render(<Layout
            header={<div className="TestHeaderClass"> </div>}
            footer={<div className="TestFooterClass"> </div>}>

            <div className="TestClass">
            </div>
        </Layout>);

        const header = container.querySelector('.TestHeaderClass');
        const footer = container.querySelector('.TestFooterClass');
        const layoutContext = container.querySelector('.TestClass');

        expect(header).toBeInTheDocument();
        expect(footer).toBeInTheDocument();
        expect(layoutContext).toBeInTheDocument();
    });
})
