import { Action } from 'wb-core-provider';

export enum FetchActionType {
    SET_LOADING = 'FETCH_ACTION@SET_START',
    APPEND_DATA = 'FETCH_ACTION@APPEND_DATA',
    SET_DATA = 'FETCH_ACTION@SET_DATA',
    SET_ERROR = 'FETCH_ACTION@SET_ERROR',
    SET_TOTAL_COUNT = 'FETCH_ACTION@SET_TOTAL_COUNT',
}

export type FetchAction<TPayload> = Action<FetchActionType, TPayload>;

export class FetchActions {
    public static setLoading(loading: boolean): FetchAction<boolean> {
        return {
            type: FetchActionType.SET_LOADING,
            payload: loading,
        };
    }

    public static setData(data: unknown[]): FetchAction<unknown[]> {
        return {
            type: FetchActionType.SET_DATA,
            payload: data,
        };
    }

    public static appendData(data: unknown[]): FetchAction<unknown[]> {
        return {
            type: FetchActionType.APPEND_DATA,
            payload: data,
        };
    }

    public static setError(error: unknown): FetchAction<unknown> {
        return {
            type: FetchActionType.SET_ERROR,
            payload: error,
        };
    }

    public static setTotalCount(totalCount: number): FetchAction<number> {
        return {
            type: FetchActionType.SET_TOTAL_COUNT,
            payload: totalCount,
        };
    }
}
