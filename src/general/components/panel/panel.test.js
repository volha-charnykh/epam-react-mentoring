import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Panel from './panel';

describe('Panel', () => {
  it('should correctly set init state', () => {
    const { container } = render(
      <Panel>
        <div className="TestClass" />
      </Panel>,
    );

    expect(container.querySelector('.TestClass')).toBeInTheDocument();
  });

  it('should correctly close', (done) => {
    const { container } = render(
      <Panel
        closable
        onClose={() => {
          expect(true).toBeTruthy();
          done();
        }}
      >
        <div className="TestClass" />
      </Panel>,
    );

    const close = container.querySelector('.PanelCloseMark');

    expect(close).toBeInTheDocument();

    userEvent.click(close);
  });
});
