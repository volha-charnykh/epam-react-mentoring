import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ResultPopup from './result-popup';

describe('ResultPopup', () => {
  it('should correctly set init state for success', () => {
    const { container } = render(<ResultPopup
      title="Title"
      description="Description"
      type="Success"
      onClose={() => {
      }}
    />);

    expect(container.querySelector('.Success')).toBeInTheDocument();
    expect(container.querySelector('.Failure')).toBeNull();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
  });

  it('should correctly set init state for failure', () => {
    const { container } = render(<ResultPopup
      title="Title"
      description="Description"
      type="Failure"
      onClose={() => {
      }}
    />);

    expect(container.querySelector('.Failure')).toBeInTheDocument();
    expect(container.querySelector('.Success')).toBeNull();
  });

  it('should correctly close', (done) => {
    const { container } = render(<ResultPopup
      title="Title"
      description="Description"
      type="Failure"
      onClose={() => {
        expect(true).toBeTruthy();
        done();
      }}
    />);

    const close = container.querySelector('.DialogCloseMark');
    userEvent.click(close);
  });
});
