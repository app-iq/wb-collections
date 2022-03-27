import { FetchAction, FetchActionType } from './FetchAction';
import { State } from './../State';
import { Reducer } from 'wbox-context';

export const FetchReducer: Reducer<State, FetchAction<unknown>> = (state, action) => {
    switch (action.type) {
        case FetchActionType.FETCH_START:
            return { ...state, loading: true, error: undefined, data: [] };
        case FetchActionType.FETCH_FAIL:
            return { ...state, loading: false, error: action.payload, data: [] };
        case FetchActionType.FETCH_DONE:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: action.payload as unknown[],
            };
    }
    return state;
};
