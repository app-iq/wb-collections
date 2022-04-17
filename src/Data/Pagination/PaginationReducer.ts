import { Reducer } from 'wbox-context';
import { State } from '../State';
import { PaginationAction, PaginationActionType } from './PaginationActions';
export const paginationReducer: Reducer<State, PaginationAction<unknown>> = (state, action) => {
    switch (action.type) {
        case PaginationActionType.RESET_PAGE:
            return { ...state, page: 0 };
        case PaginationActionType.NEXT_PAGE:
            return { ...state, page: state.page + 1 };
        case PaginationActionType.PREVIOUS_PAGE:
            return { ...state, page: Math.max(state.page - 1, 0) };
        case PaginationActionType.SET_PAGE:
            return { ...state, page: Math.max(action.payload as number, 0) };
        case PaginationActionType.SET_PAGE_SIZE:
            return { ...state, pageSize: action.payload as number | undefined };
        case PaginationActionType.SET_START_FROM:
            return { ...state, start: action.payload as number };
    }
};
