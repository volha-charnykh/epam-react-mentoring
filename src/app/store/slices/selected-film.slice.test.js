import reducer, { selectSelectedFilm, setSelectedFilm } from './selected-film.slice';

describe('selected film slice', () => {
  const mockFilm = { someField: 'someValue', anotherField: 'anotherValue' };

  describe('reducer and actions', () => {
    it('should return the initial state on first run', () => {
      expect(reducer(undefined, {})).toEqual(null);
    });

    it('should properly set the state when update selected film', () => {
      const nextState = reducer(null, setSelectedFilm(mockFilm));
      expect(nextState).toEqual(mockFilm);
    });
  });

  describe('selector', () => {
    it('should return selected film data', () => {
      const store = {
        ...mockFilm, selectedFilm: mockFilm,
      };
      expect(selectSelectedFilm(store)).toEqual(mockFilm);
    });
  });
});
