import reducer, { setGenres, selectGenres } from './genres.slice';

describe('genres slice', () => {
  const initialState = [];
  const films = [{ genres: ['Genre1', 'Genre2'] },
    { genres: ['Genre3'] }];
  const film = { genres: ['Genre2', 'Genre4', 'Genre5'] };

  describe('reducer and actions', () => {
    it('should return the initial state on first run', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should properly set the state when update setGenres', () => {
      let nextState = reducer(initialState, setGenres(films));
      expect(nextState).toEqual(['Genre1', 'Genre2', 'Genre3']);

      nextState = reducer(nextState, setGenres());
      expect(nextState).toEqual(['Genre1', 'Genre2', 'Genre3']);

      nextState = reducer(nextState, setGenres([film]));
      expect(nextState).toEqual(['Genre1', 'Genre2', 'Genre3', 'Genre4', 'Genre5']);
    });
  });

  describe('selector', () => {
    it('should return dialogs data', () => {
      const store = { genres: ['Genre2', 'Genre4', 'Genre5'] };
      expect(selectGenres(store)).toEqual(['Genre2', 'Genre4', 'Genre5']);
    });
  });
});
