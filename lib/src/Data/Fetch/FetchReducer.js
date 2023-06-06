import { FetchActionType } from './FetchAction';
export const fetchReducer = (state, action) => {
    switch (action.type) {
        case FetchActionType.SET_LOADING:
            return { ...state, loading: action.payload };
        case FetchActionType.SET_ERROR:
            return { ...state, error: action.payload };
        case FetchActionType.SET_DATA:
            return { ...state, allItems: action.payload };
        case FetchActionType.APPEND_DATA:
            return {
                ...state,
                allItems: state.allItems.concat(action.payload),
            };
        case FetchActionType.SET_TOTAL_COUNT:
            return { ...state, totalCount: action.payload };
    }
    return state;
};
