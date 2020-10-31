// eslint-disable-next-line import/no-extraneous-dependencies
import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import ViewerHeader from '../app/films-viewer/header/viewer-header/viewer-header';

export default {
  title: 'Header Story',
  component: ViewerHeader,
  decorators: [withKnobs],
};

export function DefaultViewerHeader() {
  return (
    <ViewerHeader
      searchString={text('search string', '')}
      updateSearchStr={() => console.log('Search string updated')}
      onAddFilm={() => console.log('Add film clicked')}
    />
  );
}
