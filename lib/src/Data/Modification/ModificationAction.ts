import { Action } from 'wb-core-provider';

export enum ModificationActionType {
    INSERT = 'ModificationAction@INSERT',
    UPDATE = 'ModificationAction@UPDATE',
    REMOVE = 'ModificationAction@REMOVE',
}

export type ModificationAction<TPayload> = Action<ModificationActionType, TPayload>;

export class ModificationActions {
    public static insertAt(record: unknown, index: number): ModificationAction<InsertActionPayload> {
        return {
            type: ModificationActionType.INSERT,
            payload: {
                record,
                index,
            },
        };
    }

    public static insertFirst(record: unknown): ModificationAction<InsertActionPayload> {
        return {
            type: ModificationActionType.INSERT,
            payload: {
                record,
                index: 'first',
            },
        };
    }

    public static insertLast(record: unknown): ModificationAction<InsertActionPayload> {
        return {
            type: ModificationActionType.INSERT,
            payload: {
                record,
                index: 'last',
            },
        };
    }

    public static update(changePayload: object, index: number): ModificationAction<UpdateActionPayload> {
        return {
            type: ModificationActionType.UPDATE,
            payload: {
                changePayload,
                index,
            },
        };
    }

    public static remove(index: number): ModificationAction<number> {
        return {
            type: ModificationActionType.REMOVE,
            payload: index,
        };
    }

    public static removeFirst(): ModificationAction<'first'> {
        return {
            type: ModificationActionType.REMOVE,
            payload: 'first',
        };
    }

    public static removeLast(): ModificationAction<'last'> {
        return {
            type: ModificationActionType.REMOVE,
            payload: 'last',
        };
    }
}

export interface InsertActionPayload {
    index: number | 'last' | 'first';
    record: unknown;
}

export interface UpdateActionPayload {
    index: number;
    changePayload: object;
}
