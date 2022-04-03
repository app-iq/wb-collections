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
        case FetchActionType.FETCH_MORE_START:
            return { ...state, fetchMoreLoading: false, fetchMoreError: undefined };
        case FetchActionType.FETCH_MORE_FAIL:
            return { ...state, fetchMoreError: action.payload, fetchMoreLoading: false };
        case FetchActionType.FETCH_MORE_DONE:
            return {
                ...state,
                items: state.items.concat(action.payload as unknown[]),
                fetchMoreLoading: false,
                fetchMoreError: undefined,
            };
        case FetchActionType.SET_TOTAL_COUNT:
            return { ...state, totalCount: action.payload as number };
    }
    return state;
};
