import { useState } from 'wb-core-provider';
import { State } from '../Data/State';

export const useRenderFlags = () => {
    const state = useState<State>();
    return {
        isLoading: state.loading,
        isError: !!state.error,
        isEmpty: state.items.length === 0 && !state.loading && !state.error,
    };
};
