/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'wb-core-provider';
import { useCollectionData } from '../../Hooks/UseCollectionData';
import { buildState } from '../Utils/Helpers';

jest.mock('wb-core-provider', () => {
    return {
        useState: jest.fn(),
    };
});

function buildItems(size: number) {
    return Array(size)
        .fill(undefined)
        .map((_, index) => ({ value: `item ${index + 1}` }));
}

describe('useCollectionData', () => {
    it('it should return data when page size is defined and initial page', () => {
        const state = buildState({ page: 0, pageSize: 3, items: buildItems(9), totalCount: 9 });

        // @ts-ignore
        useState.mockReturnValue(state);

        const [items, totalCount, page] = useCollectionData();
        expect(items).toEqual([{ value: 'item 1' }, { value: 'item 2' }, { value: 'item 3' }]);
        expect(totalCount).toEqual(9);
        expect(page).toEqual(0);
    });

    it('it should return data when page size is defined and second page', () => {
        const state = buildState({ page: 1, pageSize: 3, items: buildItems(9), totalCount: 9 });

        // @ts-ignore
        useState.mockReturnValue(state);

        const [items, totalCount, page] = useCollectionData();
        expect(items).toEqual([{ value: 'item 4' }, { value: 'item 5' }, { value: 'item 6' }]);
        expect(totalCount).toEqual(9);
        expect(page).toEqual(1);
    });

    it('it should return all items when page size is not defined', () => {
        const state = buildState({ page: 0, pageSize: undefined, items: buildItems(4), totalCount: 9 });

        // @ts-ignore
        useState.mockReturnValue(state);

        const [items, totalCount, page] = useCollectionData();
        expect(items).toEqual([{ value: 'item 1' }, { value: 'item 2' }, { value: 'item 3' }, { value: 'item 4' }]);
        expect(totalCount).toEqual(9);
        expect(page).toEqual(0);
    });

    it('it should return all items when page size is not defined regardless what page is set', () => {
        const state = buildState({ page: 1, pageSize: undefined, items: buildItems(4), totalCount: 9 });

        // @ts-ignore
        useState.mockReturnValue(state);

        const [items, totalCount, page] = useCollectionData();
        expect(items).toEqual([{ value: 'item 1' }, { value: 'item 2' }, { value: 'item 3' }, { value: 'item 4' }]);
        expect(totalCount).toEqual(9);
        expect(page).toEqual(1);
    });
});
