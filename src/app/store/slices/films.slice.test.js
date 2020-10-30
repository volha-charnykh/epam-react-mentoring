import reducer, {
  loadFilms, setFilms, selectFilms, addFilm, updateFilm, deleteFilm,
} from './films.slice';

import { FilmApi } from '../../api/films.api';
import { setGenres } from './genres.slice';
import { selectSearchParams } from './search-params.slice';

jest.mock('../../api/films.api', () => ({
  FilmApi: {
    createFilm: jest.fn((el) => Promise.resolve(el)),
    deleteFilm: jest.fn(() => Promise.resolve()),
    updateFilm: jest.fn((el) => Promise.resolve(el)),
    loadFilms: jest.fn(() => Promise.resolve([{ id: 1 }, { id: 2 }])),
  },
}));

jest.mock('./search-params.slice', () => ({
  selectSearchParams: jest.fn(() => ({ param1: 'value1', param2: 'value2' })),
}));

jest.mock('./genres.slice', () => ({
  setGenres: jest.fn(),
}));

const mockDispatch = jest.fn();

describe('search params slice', () => {
  const initialState = [];
  const films = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const film = { id: 5 };

  describe('reducer and actions', () => {
    it('should return the initial state on first run', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should properly set the state with setFilms', () => {
      let nextState = reducer(initialState, setFilms(films));
      expect(nextState).toEqual(films);

      nextState = reducer([...films], setFilms([film]));
      expect(nextState).toEqual([film]);
    });

    it('should properly set the state with loadFilms', (done) => {
      loadFilms()(mockDispatch, () => {
      }).then(() => {
        expect(FilmApi.loadFilms).toHaveBeenCalledWith({ param1: 'value1', param2: 'value2' });
        expect(selectSearchParams).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalled();
        expect(setGenres).toHaveBeenCalledWith([{ id: 1 }, { id: 2 }]);
        const params = mockDispatch.mock.calls[0][0];
        const nextState = reducer(null, params);
        expect(nextState).toEqual([{ id: 1 }, { id: 2 }]);
        done();
      });
    });

    it('should properly call onSuccess when loadFilms', (done) => {
      const onSuccess = jest.fn();
      loadFilms(onSuccess)(mockDispatch, () => {
      }).then(() => {
        expect(onSuccess).toHaveBeenCalledWith(mockDispatch, [{ id: 1 }, { id: 2 }]);
        done();
      });
    });

    it('should properly handle error when loadFilms', (done) => {
      const onError = jest.fn();
      FilmApi.loadFilms.mockReturnValueOnce(Promise.reject(Error('error')));
      loadFilms(null, onError)(mockDispatch, () => {
      }).then(() => {
        expect(onError).toHaveBeenCalled();
        done();
      });
    });

    it('should properly perform addFilm', (done) => {
      addFilm(film)(mockDispatch, () => {
      }).then(() => {
        expect(FilmApi.createFilm).toHaveBeenCalledWith(film);
        done();
      });
    });

    it('should properly call onSuccess when addFilm', (done) => {
      const onSuccess = jest.fn();
      addFilm(film, onSuccess)(mockDispatch, () => {
      }).then(() => {
        expect(onSuccess).toHaveBeenCalledWith(mockDispatch, film);
        done();
      });
    });

    it('should properly handle error when addFilm', (done) => {
      const onError = jest.fn();
      FilmApi.createFilm.mockReturnValueOnce(Promise.reject(Error('error')));
      addFilm(film, null, onError)(mockDispatch, () => {
      }).then(() => {
        expect(onError).toHaveBeenCalled();
        done();
      });
    });

    it('should properly perform updateFilm', (done) => {
      updateFilm(film)(mockDispatch, () => {
      }).then(() => {
        expect(FilmApi.updateFilm).toHaveBeenCalledWith(film);
        done();
      });
    });

    it('should properly call onSuccess when updateFilm', (done) => {
      const onSuccess = jest.fn();
      updateFilm(film, onSuccess)(mockDispatch, () => {
      }).then(() => {
        expect(onSuccess).toHaveBeenCalledWith(mockDispatch, film);
        done();
      });
    });

    it('should properly handle error when updateFilm', (done) => {
      const onError = jest.fn();
      FilmApi.updateFilm.mockReturnValueOnce(Promise.reject(Error('error')));
      updateFilm(film, null, onError)(mockDispatch, () => {
      }).then(() => {
        expect(onError).toHaveBeenCalled();
        done();
      });
    });

    it('should properly perform deleteFilm ', (done) => {
      deleteFilm(film.id)(mockDispatch, () => {
      }).then(() => {
        expect(FilmApi.deleteFilm).toHaveBeenCalledWith(film.id);
        done();
      });
    });

    it('should properly call onSuccess when deleteFilm ', (done) => {
      const onSuccess = jest.fn();
      deleteFilm(film.id, onSuccess)(mockDispatch, () => {
      }).then(() => {
        expect(onSuccess).toHaveBeenCalled();
        done();
      });
    });

    it('should properly handle error when deleteFilm ', (done) => {
      const onError = jest.fn();
      FilmApi.deleteFilm.mockReturnValueOnce(Promise.reject(Error('error')));
      deleteFilm(film, null, onError)(mockDispatch, () => {
      }).then(() => {
        expect(onError).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('selector', () => {
    it('should return search params data', () => {
      const store = {
        ...film,
        films: [{
          id: 1,
          title: 'Title1',
        }],
      };
      expect(selectFilms(store)).toEqual([{
        id: 1,
        title: 'Title1',
      }]);
    });
  });
});
