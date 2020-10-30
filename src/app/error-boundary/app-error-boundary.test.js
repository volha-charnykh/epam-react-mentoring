import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import AppErrorBoundary from './app-error-boundary';

const ErrorComponent = () => { throw 'error'; };

describe('AppErrorBoundary', () => {
  it('should correctly init', () => {
    const { container } = render(
      <AppErrorBoundary>
        <div className="TestClass" />
      </AppErrorBoundary>,
    );
    expect(container.querySelector('.TestClass')).toBeInTheDocument();
  });

  it('should correctly handle error', () => {
    const { container } = render(
      <AppErrorBoundary>
        <ErrorComponent />
      </AppErrorBoundary>,
    );

    expect(container.querySelector('.ErrorPage')).toBeInTheDocument();
  });
});
