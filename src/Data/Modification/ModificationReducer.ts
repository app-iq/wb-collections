import {
    ModificationAction,
    ModificationActionType,
    InsertActionPayload,
    UpdateActionPayload,
} from './ModificationAction';
import { Reducer } from 'wbox-context';
import { State } from '../State';

type Index = number | 'last' | 'first';

export const modificationReducer: Reducer<State, ModificationAction<unknown>> = (state, action) => {
    switch (action.type) {
        case ModificationActionType.INSERT:
            return insert(state, action.payload as InsertActionPayload);
        case ModificationActionType.REMOVE:
            return remove(state, action.payload as Index);
        case ModificationActionType.UPDATE:
            return update(state, action.payload as UpdateActionPayload);
    }
    return state;
};

const insert = (state: State, payload: InsertActionPayload) => {
    const data = [...state.items];
    data.splice(getIndex(payload.index, data), 0, payload.record);
    return {
        ...state,
        data: data,
    };
};

const remove = (state: State, index: Index) => {
    const data = [...state.items];
    data.splice(getIndex(index, data), 1);
    return {
        ...state,
        data: data,
    };
};

const update = (state: State, payload: UpdateActionPayload) => {
    const data = [...state.items];
    const index = getIndex(payload.index, data);
    const item = data[index];
    data[index] = { ...(item as object), ...payload.changePayload };
    return {
        ...state,
        data: data,
    };
};

const getIndex = (index: Index, data: unknown[]): number => {
    if (index === 'first') return 0;
    if (index === 'last') return data.length - 1;
    return index;
};
