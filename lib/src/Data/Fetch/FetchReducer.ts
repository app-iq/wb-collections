import { Reducer } from 'wb-provider';
import { FetchAction, FetchActionType } from './FetchAction';
import { State } from '../State';

export const fetchReducer: Reducer<State, FetchAction<unknown>> = (state, action) => {
    switch (action.type) {
        case FetchActionType.SET_LOADING:
            return { ...state, loading: action.payload as boolean };
        case FetchActionType.SET_ERROR:
            return { ...state, error: action.payload };
        case FetchActionType.SET_DATA:
            return { ...state, items: action.payload as unknown[] };
        case FetchActionType.APPEND_DATA:
            return {
                ...state,
                items: state.items.concat(action.payload as unknown[]),
            };
        case FetchActionType.SET_TOTAL_COUNT:
            return { ...state, totalCount: action.payload as number };

        default:
            return state;
    }
};
