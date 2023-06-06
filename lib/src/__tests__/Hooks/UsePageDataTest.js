import { buildState } from '../Utils/Helpers';
import { useState } from 'wb-core-provider';
import { usePagingData } from '../../Hooks/UsePagingData';
jest.mock('wb-core-provider', () => {
    return {
        useState: jest.fn(),
    };
});
function buildItems(size) {
    return Array(size)
        .fill(undefined)
        .map((_, index) => ({ value: `item ${index + 1}` }));
}
describe('useCollectionData', () => {
    it('it should return data when page count is one', () => {
        const state = buildState({ page: 0, pageSize: 9, allItems: buildItems(8), totalCount: 8 });
        useState.mockReturnValue(state);
        const data = usePagingData();
        const expected = {
            pageCount: 1,
            pageSize: 9,
            previousPage: undefined,
            nextPage: undefined,
            totalCount: 8,
            lastPage: 0,
            firstPage: 0,
            currentPage: 0,
        };
        expect(data).toEqual(expected);
    });
    it('it should return data when page count is two', () => {
        const state = buildState({ page: 0, pageSize: 9, allItems: buildItems(17), totalCount: 17 });
        useState.mockReturnValue(state);
        const data = usePagingData();
        const expected = {
            pageCount: 2,
            pageSize: 9,
            previousPage: undefined,
            nextPage: 1,
            totalCount: 17,
            lastPage: 1,
            firstPage: 0,
            currentPage: 0,
        };
        expect(data).toEqual(expected);
    });
    it('it should return data when page count is five', () => {
        const state = buildState({ page: 2, pageSize: 3, allItems: buildItems(15), totalCount: 15 });
        useState.mockReturnValue(state);
        const data = usePagingData();
        const expected = {
            pageCount: 5,
            pageSize: 3,
            previousPage: 1,
            nextPage: 3,
            totalCount: 15,
            lastPage: 4,
            firstPage: 0,
            currentPage: 2,
        };
        expect(data).toEqual(expected);
    });
    it('it should return data when current page is the last page', () => {
        const state = buildState({ page: 4, pageSize: 3, allItems: buildItems(15), totalCount: 15 });
        useState.mockReturnValue(state);
        const data = usePagingData();
        const expected = {
            pageCount: 5,
            pageSize: 3,
            previousPage: 3,
            nextPage: undefined,
            totalCount: 15,
            lastPage: 4,
            firstPage: 0,
            currentPage: 4,
        };
        expect(data).toEqual(expected);
    });
    it('it should return data when current page is the first page', () => {
        const state = buildState({ page: 0, pageSize: 3, allItems: buildItems(15), totalCount: 15 });
        useState.mockReturnValue(state);
        const data = usePagingData();
        const expected = {
            pageCount: 5,
            pageSize: 3,
            previousPage: undefined,
            nextPage: 1,
            totalCount: 15,
            lastPage: 4,
            firstPage: 0,
            currentPage: 0,
        };
        expect(data).toEqual(expected);
    });
    it('it should return data when page size is not set', () => {
        const state = buildState({ page: 0, pageSize: undefined, allItems: buildItems(15), totalCount: 15 });
        useState.mockReturnValue(state);
        const data = usePagingData();
        const expected = {
            pageCount: 1,
            pageSize: undefined,
            previousPage: undefined,
            nextPage: undefined,
            totalCount: 15,
            lastPage: 0,
            firstPage: 0,
            currentPage: 0,
        };
        expect(data).toEqual(expected);
    });
});
