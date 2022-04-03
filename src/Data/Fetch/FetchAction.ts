import { Action } from 'wbox-context';

export enum FetchActionType {
    FETCH_START = 'FETCH_ACTION@FETCH_START',
    FETCH_DONE = 'FETCH_ACTION@FETCH_DONE',
    FETCH_FAIL = 'FETCH_ACTION@FETCH_FAIL',
    SET_LOADING = 'FETCH_ACTION@SET_LOADING',
    SET_ERROR = 'FETCH_ACTION@SET_ERROR',
    APPEND_ITEMS = 'FETCH_ACTION@APPEND_DATA',
    SET_TOTAL_COUNT = 'FETCH_ACTION@SET_TOTAL_COUNT',
    RESET_PAGE = 'FETCH_ACTION@RESET_PAGE',
    NEXT_PAGE = 'FETCH_ACTION@RESET_PAGE',
    PREVIOUS_PAGE = 'FETCH_ACTION@RESET_PAGE',
    SET_PAGE = 'FETCH_ACTION@SET_PAGE',
}

export type FetchAction<TPayload> = Action<FetchActionType, TPayload>;

export class FetchActions {
    public static start(): FetchAction<undefined> {
        return {
            type: FetchActionType.FETCH_START,
            payload: undefined,
        };
    }

    public static done(data: unknown[]): FetchAction<unknown[]> {
        return {
            type: FetchActionType.FETCH_DONE,
            payload: data,
        };
    }

    public static fail(error: unknown): FetchAction<unknown> {
        return {
            type: FetchActionType.FETCH_FAIL,
            payload: error,
        };
    }

    public static loading(loading: boolean): FetchAction<boolean> {
        return {
            type: FetchActionType.SET_LOADING,
            payload: loading,
        };
    }

    public static error(e: unknown): FetchAction<unknown> {
        return {
            type: FetchActionType.SET_ERROR,
            payload: e,
        };
    }

    public static appendItems(items: unknown[]): FetchAction<unknown[]> {
        return {
            type: FetchActionType.APPEND_ITEMS,
            payload: items,
        };
    }

    public static setTotalCount(totalCount: number): FetchAction<number> {
        return {
            type: FetchActionType.SET_TOTAL_COUNT,
            payload: totalCount,
        };
    }

    public static setPage(page: number): FetchAction<number> {
        return {
            type: FetchActionType.SET_PAGE,
            payload: page,
        };
    }

    public static nextPage(): FetchAction<undefined> {
        return {
            type: FetchActionType.NEXT_PAGE,
            payload: undefined,
        };
    }

    public static previousPage(): FetchAction<undefined> {
        return {
            type: FetchActionType.PREVIOUS_PAGE,
            payload: undefined,
        };
    }

    public static resetPage(): FetchAction<undefined> {
        return {
            type: FetchActionType.RESET_PAGE,
            payload: undefined,
        };
    }
}
