import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ConfirmationDialog from './confirmation-dialog';

describe('ConfirmationDialog', () => {
  it('should correctly set init state', () => {
    render(<ConfirmationDialog
      title="Title"
      description="Description"
      onConfirm={() => {}}
      onClose={() => {}}
    />);

    const button = screen.getByText(/confirm/i);

    expect(button).toBeInTheDocument();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
  });

  it('should correctly confirm', (done) => {
    render(<ConfirmationDialog
      title="Title"
      description="Description"
      onConfirm={() => {
        expect(true).toBeTruthy();
        done();
      }}
      onClose={() => {
        expect(false).toBeTruthy();
      }}
    />);

    const button = screen.getByText(/confirm/i);

    userEvent.click(button);
  });

  it('should correctly close', (done) => {
    const { container } = render(<ConfirmationDialog
      title="Title"
      description="Description"
      onConfirm={() => {
        expect(false).toBeTruthy();
      }}
      onClose={() => {
        expect(true).toBeTruthy();
        done();
      }}
    />);

    const close = container.querySelector('.DialogCloseMark');

    expect(close).toBeInTheDocument();
    userEvent.click(close);
  });
});
