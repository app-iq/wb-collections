import { Reducer } from 'wb-core-provider';
import {
    InsertActionPayload,
    ModificationAction,
    ModificationActionType,
    UpdateActionPayload,
} from './ModificationAction';
import { State } from '../State';

type Index = number | 'last' | 'first';

const getIndex = (index: Index, data: unknown[]): number => {
    if (index === 'first') return 0;
    if (index === 'last') return data.length - 1;
    return index;
};

const insert = (state: State, payload: InsertActionPayload): State => {
    const data = [...state.items];
    if (payload.index === 'last') {
        data.push(payload.record);
    } else {
        data.splice(getIndex(payload.index, data), 0, payload.record);
    }
    return {
        ...state,
        items: data,
    };
};

const remove = (state: State, index: Index): State => {
    const data = [...state.items];
    data.splice(getIndex(index, data), 1);
    return {
        ...state,
        items: data,
    };
};

const update = (state: State, payload: UpdateActionPayload): State => {
    const data = [...state.items];
    const index = getIndex(payload.index, data);
    const item = data[index] as object;
    data[index] = { ...item, ...payload.changePayload };
    return {
        ...state,
        items: data,
    };
};

export const modificationReducer: Reducer<State, ModificationAction<unknown>> = (state, action) => {
    switch (action.type) {
        case ModificationActionType.INSERT:
            return insert(state, action.payload as InsertActionPayload);
        case ModificationActionType.REMOVE:
            return remove(state, action.payload as Index);
        case ModificationActionType.UPDATE:
            return update(state, action.payload as UpdateActionPayload);
        default:
            return state;
    }
};
