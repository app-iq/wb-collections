import { Action } from 'wbox-context';

export enum FetchActionType {
    FETCH_START = 'FETCH_ACTION@FETCH_START',
    FETCH_DONE = 'FETCH_ACTION@FETCH_DONE',
    FETCH_FAIL = 'FETCH_ACTION@FETCH_FAIL',
    FETCH_MORE_START = 'FETCH_ACTION@FETCH_MORE_START',
    FETCH_MORE_FAIL = 'FETCH_ACTION@FETCH_MORE_FAIL',
    FETCH_MORE_DONE = 'FETCH_ACTION@FETCH_MORE_DONE',
    SET_TOTAL_COUNT = 'FETCH_ACTION@SET_TOTAL_COUNT',
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

    public static moreStarted(): FetchAction<undefined> {
        return {
            type: FetchActionType.FETCH_MORE_START,
            payload: undefined,
        };
    }

    public static moreFailed(e: unknown): FetchAction<unknown> {
        return {
            type: FetchActionType.FETCH_MORE_FAIL,
            payload: e,
        };
    }

    public static moreDone(items: unknown[]): FetchAction<unknown[]> {
        return {
            type: FetchActionType.FETCH_MORE_DONE,
            payload: items,
        };
    }

    public static setTotalCount(totalCount: number): FetchAction<number> {
        return {
            type: FetchActionType.SET_TOTAL_COUNT,
            payload: totalCount,
        };
    }
}
