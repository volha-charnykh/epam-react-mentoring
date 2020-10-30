import React from 'react';
import { render } from '@testing-library/react';
import Logo from './logo';

describe('Logo', () => {
  it('renders Logo snapshot', () => {
    const { asFragment } = render(<Logo />);
    expect(asFragment()).toMatchSnapshot();
  });
});
