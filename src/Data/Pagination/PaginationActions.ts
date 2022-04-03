import { Action } from 'wbox-context';

export enum PaginationActionType {
    RESET_PAGE = 'FETCH_ACTION@RESET_PAGE',
    NEXT_PAGE = 'FETCH_ACTION@RESET_PAGE',
    PREVIOUS_PAGE = 'FETCH_ACTION@RESET_PAGE',
    SET_PAGE = 'FETCH_ACTION@SET_PAGE',
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
}
