import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Dialog from './dialog';

describe('Dialog', () => {
  it('should correctly set init state', () => {
    const { container } = render(
      <Dialog onClose={() => {
      }}
      >
        <div className="TestClass" />
      </Dialog>,
    );

    const close = container.querySelector('.DialogCloseMark');

    expect(close).toBeInTheDocument();
    expect(container.querySelector('.TestClass')).toBeInTheDocument();
  });

  it('should correctly close', (done) => {
    const { container } = render(
      <Dialog
        onClose={() => {
          expect(true).toBeTruthy();
          done();
        }}
      >
        <div className="TestClass" />
      </Dialog>,
    );

    const close = container.querySelector('.DialogCloseMark');

    expect(close).toBeInTheDocument();
    userEvent.click(close);
  });
});
