import { useState } from 'wb-core-provider';
import { useRenderFlags } from '../../Hooks/UseRenderFlags';
import { buildState } from '../Utils/Helpers';
import Mock = jest.Mock;

jest.mock('wb-core-provider', () => {
    return {
        useState: jest.fn(),
    };
});

describe('useRenderFlags', () => {
    describe('isLoading', () => {
        it('should return isLoading', () => {
            const state = buildState({ items: [], loading: true });

            (useState as Mock).mockReturnValue(state);

            const { isLoading } = useRenderFlags();
            expect(isLoading).toEqual(true);
        });
    });

    describe('isError', () => {
        it('should return isError', () => {
            const state = buildState({ items: [], error: { message: 'some error' } });

            (useState as Mock).mockReturnValue(state);

            const { isError } = useRenderFlags();
            expect(isError).toEqual(true);
        });
    });

    describe('isEmpty', () => {
        it('should return isEmpty', () => {
            const state = buildState({ items: [], error: undefined, loading: false });

            (useState as Mock).mockReturnValue(state);

            const { isEmpty } = useRenderFlags();
            expect(isEmpty).toEqual(true);
        });

        it('should return false for isEmpty when loading', () => {
            const state = buildState({ items: [], error: undefined, loading: true });

            (useState as Mock).mockReturnValue(state);

            const { isEmpty } = useRenderFlags();
            expect(isEmpty).toEqual(false);
        });

        it('should return false for isEmpty when error', () => {
            const state = buildState({ items: [], error: { message: 'some error' }, loading: false });

            (useState as Mock).mockReturnValue(state);

            const { isEmpty } = useRenderFlags();
            expect(isEmpty).toEqual(false);
        });
    });

    describe('canFetchMore', () => {
        it('should return canFetchMore', () => {
            const state = buildState({ totalCount: 3, items: ['item-1', 'item-2'], error: undefined, loading: false });

            (useState as Mock).mockReturnValue(state);
            const { canFetchMore } = useRenderFlags();
            expect(canFetchMore).toEqual(true);
        });

        it('should return false for canFetchMore when loading', () => {
            const state = buildState({ totalCount: 3, items: ['item-1', 'item-2'], error: undefined, loading: true });

            (useState as Mock).mockReturnValue(state);
            const { canFetchMore } = useRenderFlags();
            expect(canFetchMore).toEqual(false);
        });

        it('should return false for canFetchMore when error', () => {
            const state = buildState({
                totalCount: 3,
                items: ['item-1', 'item-2'],
                error: { message: 'some error' },
                loading: false,
            });

            (useState as Mock).mockReturnValue(state);
            const { canFetchMore } = useRenderFlags();
            expect(canFetchMore).toEqual(false);
        });

        it('should return false for canFetchMore when totalCount <= items.length', () => {
            const state = buildState({
                totalCount: 2,
                items: ['item-1', 'item-2'],
                error: undefined,
                loading: false,
            });

            (useState as Mock).mockReturnValue(state);
            const { canFetchMore } = useRenderFlags();
            expect(canFetchMore).toEqual(false);
        });
    });
});
