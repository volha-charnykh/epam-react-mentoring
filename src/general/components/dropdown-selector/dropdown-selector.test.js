import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import DropdownSelector from './dropdown-selector';

describe('DropdownSelector', () => {
  const dropdownItems = ['Item1', 'Item2', 'Item3'];

  it('should correctly set init state', () => {
    const { container } = render(<DropdownSelector
      available={dropdownItems}
      value={[dropdownItems[1]]}
      onSelect={() => {
      }}
    />);

    const dropdownButton = container.querySelector('.DropdownSelectorButton');
    const panel = container.querySelector('.Panel');

    expect(dropdownButton).toBeInTheDocument();
    expect(panel).toBeNull();
    expect(screen.getByText(dropdownItems[1])).toBeInTheDocument();
  });

  it('should correctly open', () => {
    const { container } = render(<DropdownSelector
      available={dropdownItems}
      value={[dropdownItems[1]]}
      onSelect={() => {
      }}
    />);

    const dropdownButton = container.querySelector('.DropdownSelectorButton');

    expect(container.querySelector('.DropdownButtonTriangle')).toBeInTheDocument();

    userEvent.click(dropdownButton);

    expect(container.querySelector('.Panel')).toBeInTheDocument();
    dropdownItems.forEach((el) => {
      expect(screen.queryAllByText(el)[0]).toBeInTheDocument();
    });
  });

  it('should correctly select', (done) => {
    const { container } = render(<DropdownSelector
      available={dropdownItems}
      value={[dropdownItems[1]]}
      onSelect={(item) => {
        expect(item).toEqual([dropdownItems[1], dropdownItems[2]]);
        done();
      }}
    />);

    const dropdownButton = container.querySelector('.DropdownSelectorButton');

    userEvent.click(dropdownButton);

    expect(container.querySelector('.Panel')).toBeInTheDocument();

    const item = screen.queryByText(dropdownItems[2]);

    userEvent.click(item);
  });

  it('should correctly unselect', (done) => {
    const { container } = render(<DropdownSelector
      available={dropdownItems}
      value={[dropdownItems[1], dropdownItems[2]]}
      onSelect={(item) => {
        expect(item).toEqual([dropdownItems[1]]);
        done();
      }}
    />);

    const dropdownButton = container.querySelector('.DropdownSelectorButton');

    userEvent.click(dropdownButton);

    expect(container.querySelector('.Panel')).toBeInTheDocument();

    const item = screen.queryByText(dropdownItems[2]);

    userEvent.click(item);
  });
});
