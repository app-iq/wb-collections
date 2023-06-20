import { useState } from 'wb-provider';
import { State } from '../Data/State';

export const useRenderFlags = () => {
    const state = useState<State>();
    return {
        isLoading: state.loading,
        isError: !!state.error,
        isEmpty: state.items.length === 0 && !state.loading && !state.error,
        canFetchMore: !state.loading && !state.error && state.items.length < state.totalCount,
    };
};
