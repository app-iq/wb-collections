import { useState } from 'wb-core-provider';
import { State } from '../Data/State';

export function useCollectionData(): [unknown[], number, number] {
    const state = useState<State>();
    const startIndex = state.pageSize ? state.page * (state.pageSize ?? 0) : 0;
    const endIndex = state.pageSize ? startIndex + state.pageSize : undefined;
    const items = state.items.slice(startIndex, endIndex);
    return [items, state.totalCount, state.page];
}
