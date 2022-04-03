import { FetchAction, FetchActionType } from './FetchAction';
import { State } from './../State';
import { Reducer } from 'wbox-context';

export const FetchReducer: Reducer<State, FetchAction<unknown>> = (state, action) => {
    switch (action.type) {
        case FetchActionType.FETCH_START:
            return { ...state, loading: true, error: undefined, items: [] };
        case FetchActionType.FETCH_FAIL:
            return { ...state, loading: false, error: action.payload, items: [] };
        case FetchActionType.FETCH_DONE:
            return {
                ...state,
                loading: false,
                error: undefined,
                items: action.payload as unknown[],
            };
        case FetchActionType.SET_LOADING:
            return { ...state, loading: action.payload as boolean };
        case FetchActionType.SET_ERROR:
            return { ...state, error: action.payload };
        case FetchActionType.APPEND_ITEMS:
            return { ...state, items: state.items.concat(action.payload as unknown[]) };
        case FetchActionType.SET_TOTAL_COUNT:
            return { ...state, totalCount: action.payload as number };
        case FetchActionType.RESET_PAGE:
            return { ...state, page: 0 };
        case FetchActionType.NEXT_PAGE:
            return { ...state, page: state.page + 1 };
        case FetchActionType.PREVIOUS_PAGE:
            return { ...state, page: Math.max(state.page - 1, 0) };
        case FetchActionType.SET_PAGE:
            return { ...state, page: Math.max(action.payload as number, 0) };
    }
    return state;
};
