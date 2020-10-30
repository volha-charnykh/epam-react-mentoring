import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import FormItem from './form-item';

jest.mock('formik', () => ({
  useField: jest.fn(() => [{}, {}]),
}));

describe('FormItem', () => {
  it('should correctly set init state', () => {
    render(<FormItem
      label="Label"
      type="text"
    />);

    expect(screen.getByText(/label/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
