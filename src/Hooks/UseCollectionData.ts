import { useState } from "wbox-context";
import { State } from "../Data/State";

export function useCollectionData() { 
    const state = useState<State>();
    const startIndex = state.pageSize ? state.page * (state.pageSize ?? 0) : 0;
    const endIndex = state.pageSize ? startIndex + state.pageSize : undefined;
    const items = state.allItems.slice(startIndex , endIndex);
    return [
        items,
        state.totalCount,
        state.page
    ];
}