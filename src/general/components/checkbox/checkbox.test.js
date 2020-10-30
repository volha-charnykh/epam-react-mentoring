import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Checkbox from './checkbox';

describe('Checkbox', () => {
  it('should correctly set init state', () => {
    render(<Checkbox title="Title" checked onCheck={() => {}} />);

    const checkbox = screen.getByRole(/checkbox/i);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBeTruthy();
  });

  it('should correctly set init state', () => {
    render(<Checkbox title="Title" checked={false} onCheck={() => {}} />);

    const checkbox = screen.getByRole(/checkbox/i);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBeFalsy();
  });

  it('should correctly change state', (done) => {
    render(<Checkbox
      title="Title"
      checked={false}
      onCheck={(checked) => {
        expect(checked).toBeTruthy();
        done();
      }}
    />);

    const checkbox = screen.getByRole(/checkbox/i);

    userEvent.click(checkbox);
  });

  it('should correctly change state', (done) => {
    render(<Checkbox
      title="Title"
      checked
      onCheck={(checked) => {
        expect(checked).toBeFalsy();
        done();
      }}
    />);

    const checkbox = screen.getByRole(/checkbox/i);

    userEvent.click(checkbox);
  });
});
