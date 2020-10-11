import reducer, {
    loadFilmDetails,
    selectFilmDetails
} from "./film-details.slice";

jest.mock("../../api/films.api", () => ({
    FilmApi: {
        loadFilmById: jest.fn((id => Promise.resolve({
            id: id,
            title: 'Title' + id
        })))
    }
}))

import {FilmApi} from "../../api/films.api";

const mockDispatch = jest.fn()

describe('search params slice', () => {

    describe('reducer and actions', () => {
        it('should return the initial state on first run', () => {
            expect(reducer(undefined, {})).toEqual(null);
        });

        it('should properly set the state when loadFilmDetails', (done) => {
            loadFilmDetails(100)(mockDispatch).then(() => {
                expect(FilmApi.loadFilmById).toHaveBeenCalledWith(100);
                expect(mockDispatch).toHaveBeenCalled();
                const params = mockDispatch.mock.calls[0][0];
                let nextState = reducer(null, params)
                expect(nextState).toEqual({
                    id: 100,
                    title: 'Title100'
                });
                done();
            });
        });

        it('should properly call onSuccess when loadFilmDetails', (done) => {
            const onSuccess = jest.fn();
            loadFilmDetails(100, onSuccess)(mockDispatch).then(() => {
                expect(onSuccess).toHaveBeenCalledWith(mockDispatch,{
                    id: 100,
                    title: 'Title100'
                } );
                done();
            });
        });

        it('should properly handle error when loadFilmDetails', (done) => {
            const onError = jest.fn();
            FilmApi.loadFilmById.mockReturnValueOnce(Promise.reject('error'))
            loadFilmDetails(100, null, onError)(mockDispatch).then(() => {
                expect(FilmApi.loadFilmById).toHaveBeenCalledWith(100);
                expect(onError).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('selector', () => {
        it('should return search params data', () => {
            const store = {
                filmDetails: {
                    id: 1,
                    title: 'Title1'
                }
            };
            expect(selectFilmDetails(store)).toEqual({
                id: 1,
                title: 'Title1'
            });
        });
    });
});
