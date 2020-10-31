// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, boolean, array } from '@storybook/addon-knobs';
import React from 'react';
import DropdownSelector from '../general/components/dropdown-selector/dropdown-selector';

export default {
  title: 'Dropdown Selector Story',
  component: DropdownSelector,
  decorators: [withKnobs],
};

export function DropdownSelectorStory() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  return (
    <DropdownSelector
      value={array('value', [items[1], items[4]])}
      available={array('available', items)}
      onSelect={() => console.log('Item selected')}
      markInvalid={boolean('mark invalid', false)}
    />
  );
}
