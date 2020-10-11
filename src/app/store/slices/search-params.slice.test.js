import reducer, {
    setSearchString,
    setActiveGenre,
    setSortType,
    setSortOrder,
    setLimit,
    selectSearchParams,
    searchParamsSlice
} from "./search-params.slice";

jest.mock("./films.slice", ()=>({
    loadFilms: jest.fn()
}))

import {loadFilms} from "./films.slice";

const mockDispatch = jest.fn()

describe('search params slice', () => {
    const initialState ={
        sortType: 'release_date',
        sortOrder: 'desc',
        limit: 20
    };
    const mockData = {someField: 'someValue', anotherField: 'anotherValue'};

    describe('reducer and actions', () => {
        beforeEach(() => {
            mockDispatch.mockClear()
        })
        it('should return the initial state on first run', () => {
            expect(reducer(undefined, {})).toEqual(initialState);
        });

        it('should properly set the state when update setSearchString', () => {
            setSearchString('TestString')(mockDispatch);
            expect(loadFilms).toHaveBeenCalled();
            expect(mockDispatch).toHaveBeenCalledTimes( 2);
            const params = mockDispatch.mock.calls[0][0];
            let nextState = reducer(initialState, params)
            expect(nextState).toEqual({...initialState, searchString: 'TestString'});
        });

        it('should properly set the state when update setActiveGenre', () => {
            setActiveGenre(mockData)(mockDispatch);
            expect(loadFilms).toHaveBeenCalled();
            expect(mockDispatch).toHaveBeenCalledTimes( 2);
            const params = mockDispatch.mock.calls[0][0];
            let nextState = reducer(initialState, params)
            expect(nextState).toEqual({...initialState, activeGenre: mockData});
        });

        it('should properly set the state when update setSortType', () => {
           setSortType('TestString')(mockDispatch);
            expect(loadFilms).toHaveBeenCalled();
            expect(mockDispatch).toHaveBeenCalledTimes( 2);
            const params = mockDispatch.mock.calls[0][0];
            let nextState = reducer(initialState, params)
            expect(nextState).toEqual({...initialState, sortType: 'TestString'});
        });

        it('should properly set the state when update setSortOrder', () => {
            setSortOrder('TestString')(mockDispatch);
            expect(loadFilms).toHaveBeenCalled();
            expect(mockDispatch).toHaveBeenCalledTimes( 2);
            const params = mockDispatch.mock.calls[0][0];
            let nextState = reducer(initialState, params)
            expect(nextState).toEqual({...initialState, sortOrder: 'TestString'});
        });

        it('should properly set the state when update setLimit', () => {
            setLimit(100)(mockDispatch);
            expect(loadFilms).toHaveBeenCalled();
            expect(mockDispatch).toHaveBeenCalledTimes( 2);
            const params = mockDispatch.mock.calls[0][0];
            let nextState = reducer(initialState, params)
            expect(nextState).toEqual({...initialState, limit: 100});
        });
    });

    describe('selector', () => {
        it('should return search params data', () => {
            const store = {
                ...mockData, searchParams: mockData
            };
            expect(selectSearchParams(store)).toEqual(mockData);
        });
    });
});
