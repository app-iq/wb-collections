import {Action} from 'wb-core-provider';

export enum PaginationActionType {
    RESET_PAGE = 'FETCH_ACTION@RESET_PAGE',
    NEXT_PAGE = 'FETCH_ACTION@NEXT_PAGE',
    PREVIOUS_PAGE = 'FETCH_ACTION@PREV_PAGE',
    SET_PAGE = 'FETCH_ACTION@SET_PAGE',
    SET_START_FROM = 'FETCH_ACTION@SET_START_FROM',
    SET_PAGE_SIZE = 'FETCH_ACTION@SET_PAGE_SIZE'
}

export type PaginationAction<TPayload> = Action<PaginationActionType, TPayload>;

export class PaginationActions {
    public static setPage(page: number): PaginationAction<number> {
        return {
            type: PaginationActionType.SET_PAGE,
            payload: page,
        };
    }

    public static nextPage(): PaginationAction<undefined> {
        return {
            type: PaginationActionType.NEXT_PAGE,
            payload: undefined,
        };
    }

    public static previousPage(): PaginationAction<undefined> {
        return {
            type: PaginationActionType.PREVIOUS_PAGE,
            payload: undefined,
        };
    }

    public static resetPage(): PaginationAction<undefined> {
        return {
            type: PaginationActionType.RESET_PAGE,
            payload: undefined,
        };
    }

    public static setStart(start: number): PaginationAction<number> {
        return {
            type: PaginationActionType.SET_START_FROM,
            payload: start
        };
    }

    public static setPageSize(pageSize: number): PaginationAction<number> {
        return {
            type: PaginationActionType.SET_PAGE_SIZE,
            payload: pageSize
        };
    }

    public static setNotLimitedPageSize(): PaginationAction<undefined> {
        return {
            type: PaginationActionType.SET_PAGE_SIZE,
            payload: undefined
        };
    }
}
