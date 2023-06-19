import { useState } from 'wb-core-provider';
import { State } from '../Data/State';

export function useCollectionData() {
    const state = useState<State>();
    return {
        items: state.items,
        totalCount: state.totalCount,
        page: state.page,
    };
}
