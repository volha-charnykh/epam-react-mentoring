import config from './config';
import 'isomorphic-fetch';

export const moviesUrl = `${config.apiUrl}movies`;

const calcQueryStr = ({
  sortType,
  sortOrder,
  activeGenre,
  searchString,
  limit = 10,
}) => {
  let str = `?limit=${limit}`;
  if (sortType) {
    str += `&sortBy=${sortType}`;
  }
  if (sortOrder && (sortOrder === 'asc' || sortOrder === 'desc')) {
    str += `&sortOrder=${sortOrder}`;
  }
  if (activeGenre) {
    str += `&filter=${[activeGenre]}`;
  }
  if (searchString) {
    str += `&search=${searchString}`;
    str += '&searchBy=title';
  }
  return str;
};

export const FilmApi = {
  createFilm: (newFilm) => fetch(moviesUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(newFilm),
  })
    .then((response) => (!response.ok ? response.text().then((e) => throw e) : response)),

  deleteFilm: (film) => fetch(`${moviesUrl}/${film.id}`, { method: 'DELETE' })
    .then((response) => (!response.ok ? response.text().then((e) => throw e) : response)),

  updateFilm: (film) => fetch(moviesUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(film),
  })
    .then((response) => (!response.ok ? response.text().then((e) => throw e) : response)),

  loadFilms: (params = {}) => fetch(moviesUrl + calcQueryStr(params))
    .then((response) => (!response.ok ? response.text().then((e) => throw e) : response.json()))
    .then((json) => json.data || []),

  loadFilmById: (id) => fetch(`${moviesUrl}/${id}`)
    .then((response) => (!response.ok ? response.text().then((e) => throw e) : response.json())),
};
