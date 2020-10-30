import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import FilmDetailsHeader from './film-details-header';

import { selectFilmDetails } from '../../../store';

jest.mock('../../../store', () => ({
  loadFilmDetails: jest.fn(),
  selectFilmDetails: jest.fn(),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((selector) => selector()),
  useDispatch: jest
    .fn(() => mockDispatch),
}));

const mockHistory = { push: jest.fn() };

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => mockHistory),
  useParams: jest.fn(() => ({ filmId: 1 })),
}));
jest.mock('../../../../img/no-image.jpg', () => '');
jest.mock('../../../../img/background-movies.jpg', () => '');

describe('FilmDetailsHeader', () => {
  it('should correctly init', () => {
    selectFilmDetails.mockReturnValueOnce({
      id: 1,
      title: 'Title1',
      release_date: '2020-10-10',
      runtime: 123,
      overview: 'Text',
    });
    const { container } = render(<FilmDetailsHeader />);
    expect(container.querySelector('.FilmDetailsImage')).toBeInTheDocument();
    expect(container.querySelector('.FilmDetails')).toBeInTheDocument();
    expect(screen.getByText(/title1/i)).toBeInTheDocument();
  });

  it('should correctly navigate to no films', () => {
    selectFilmDetails.mockReturnValueOnce(null);
    const { container } = render(<FilmDetailsHeader />);
    expect(container.querySelector('.Loading')).toBeInTheDocument();
  });

  it('should correctly navigate back', () => {
    selectFilmDetails.mockReturnValueOnce({
      id: 1,
      title: 'Title1',
      vote_average: 8,
      genres: [],
      release_date: '2020-10-10',
      runtime: 123,
      overview: 'Text',
    });
    const { container } = render(<FilmDetailsHeader />);
    const back = container.querySelector('.FilmDetailsBack');

    userEvent.click(back);

    expect(mockHistory.push).toHaveBeenCalledWith({
      pathname: '/films',
      search: '',
    });
  });
});
