import { Action } from 'wbox-context';

export enum FetchActionType {
    FETCH_START = 'FETCH_ACTION@FETCH_START',
    FETCH_DONE = 'FETCH_ACTION@FETCH_DONE',
    FETCH_FAIL = 'FETCH_ACTION@FETCH_FAIL',
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
}
