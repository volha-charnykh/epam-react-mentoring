import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import FilmItem from './film-item';

jest.mock('../../../../../img/no-image.jpg', () => '');

describe('FilmItem', () => {
  const film = {
    id: 1234,
    title: 'Film Title',
    release_date: '1998-09-12',
    poster_path: 'http://test.com',
    genres: [],
    overview: 'Some text',
    runtime: 123,
    vote_average: 8,
  };

  it('should correctly init', () => {
    const { container } = render(<FilmItem film={film} />);
    expect(container.querySelector('.FilmItem')).toBeInTheDocument();
  });

  it('should display menu on hover', () => {
    const { container } = render(<FilmItem film={film} actions={[]} />);

    expect(container.querySelector('.ThreeDots')).toBeNull();

    const item = container.querySelector('.FilmItem');
    userEvent.hover(item);

    expect(container.querySelector('.ThreeDots')).toBeInTheDocument();

    userEvent.unhover(item);
    expect(container.querySelector('.ThreeDots')).toBeNull();
  });

  it('should handle menu click', (done) => {
    const { container } = render(<FilmItem
      film={film}
      actions={[{
        id: 1,
        title: 'TestAction',
        handle: () => {
          expect(true).toBeTruthy();
          done();
        },
      }]}
    />);

    const item = container.querySelector('.FilmItem');
    userEvent.hover(item);
    const menu = container.querySelector('.ThreeDots');
    userEvent.click(menu);
    const menuItem = screen.getByText('TestAction');
    userEvent.click(menuItem);
  });

  it('should handle click', (done) => {
    const { container } = render(<FilmItem
      actions={[]}
      film={{ ...film, genres: null, poster_path: null }}
      clickHandler={() => {
        expect(true).toBeTruthy();
        done();
      }}
    />);

    const img = container.querySelector('.FilmImage');
    userEvent.click(img);
  });
});
