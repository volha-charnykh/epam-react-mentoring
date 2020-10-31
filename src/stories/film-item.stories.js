// eslint-disable-next-line import/no-extraneous-dependencies
import { withKnobs, object, array } from '@storybook/addon-knobs';
import React from 'react';
import FilmItem from '../app/films-viewer/films/content/film-item/film-item';

export default {
  title: 'Film Item Story',
  component: FilmItem,
  decorators: [withKnobs],
};

export function FilmItemWithImage() {
  return (
    <FilmItem
      film={object('film', {
        id: 1,
        title: 'Film Title',
        poster_path: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
        release_date: '2012',
        overview: 'Some text',
        vote_average: 7,
        genres: ['Film Genre'],
        runtime: 123,
      })}
      clickHandler={() => console.log('Film Item Clicked')}
      actions={array('actions', [])}
    />
  );
}
