import { useState } from 'wb-core-provider';
export function useCollectionData() {
    const state = useState();
    const startIndex = state.pageSize ? state.page * (state.pageSize ?? 0) : 0;
    const endIndex = state.pageSize ? startIndex + state.pageSize : undefined;
    const items = state.allItems.slice(startIndex, endIndex);
    return [items, state.totalCount, state.page];
}
