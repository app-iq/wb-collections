import {PaginationActions} from '../../Data/Pagination/PaginationActions';
import {paginationReducer} from '../../Data/Pagination/PaginationReducer';
import {buildState} from '../../TestHelpers/Helpers';

describe('Pagination Reducer', () => {

    it('should handle reset action', () => {
        const state = buildState({page: 10});
        const action = PaginationActions.resetPage();
        const newState = paginationReducer(state, action);
        expect(newState).toEqual(buildState({
            page: 0
        }));
    });


    it('should handle next page action', () => {
        const state = buildState({ page: 1 });
        const action = PaginationActions.nextPage();
        const newState = paginationReducer(state, action);
        expect(newState).toEqual(buildState({
            page: 2
        }));
    });

    it('should handle prev page action', () => {
        const state = buildState({ page: 1 });
        const action = PaginationActions.previousPage();
        const newState = paginationReducer(state, action);
        expect(newState).toEqual(buildState({
            page: 0
        }));
    });

    it('should handle set page action', () => {
        const state = buildState({ page: 1 });
        const action = PaginationActions.setPage(5);
        const newState = paginationReducer(state, action);
        expect(newState).toEqual(buildState({
            page: 5
        }));
    });

    it('should handle set not limited page size action', () => {
        const state = buildState({ pageSize: 100 });
        const action = PaginationActions.setNotLimitedPageSize();
        const newState = paginationReducer(state, action);
        expect(newState).toEqual(buildState({
            pageSize: undefined
        }));
    });

    it('should handle set page size action', () => {
        const state = buildState({pageSize: 50});
        const action = PaginationActions.setPageSize(100);
        const newState = paginationReducer(state, action);
        expect(newState).toEqual(buildState({
            pageSize: 100
        }));
    });

});
