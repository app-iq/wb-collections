import { useState } from 'wb-provider';
import { useCollectionData } from '../../Hooks/UseCollectionData';
import { buildState } from '../Utils/Helpers';
import Mock = jest.Mock;

jest.mock('wb-provider', () => {
    return {
        useState: jest.fn(),
    };
});

describe('useCollectionData', () => {
    it('it should return data when page size is defined and initial page', () => {
        const state = buildState({ page: 0, items: ['item-1', 'item-2'], totalCount: 9 });
        (useState as Mock).mockReturnValue(state);

        const { items, totalCount, page } = useCollectionData();
        expect(items).toEqual(['item-1', 'item-2']);
        expect(totalCount).toEqual(9);
        expect(page).toEqual(0);
    });
});
