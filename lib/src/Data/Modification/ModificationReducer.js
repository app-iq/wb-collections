import { ModificationActionType, } from './ModificationAction';
export const modificationReducer = (state, action) => {
    switch (action.type) {
        case ModificationActionType.INSERT:
            return insert(state, action.payload);
        case ModificationActionType.REMOVE:
            return remove(state, action.payload);
        case ModificationActionType.UPDATE:
            return update(state, action.payload);
    }
    return state;
};
const insert = (state, payload) => {
    const data = [...state.allItems];
    if (payload.index === 'last') {
        data.push(payload.record);
    }
    else {
        data.splice(getIndex(payload.index, data), 0, payload.record);
    }
    return {
        ...state,
        allItems: data,
    };
};
const remove = (state, index) => {
    const data = [...state.allItems];
    data.splice(getIndex(index, data), 1);
    return {
        ...state,
        allItems: data,
    };
};
const update = (state, payload) => {
    const data = [...state.allItems];
    const index = getIndex(payload.index, data);
    const item = data[index];
    data[index] = { ...item, ...payload.changePayload };
    return {
        ...state,
        allItems: data,
    };
};
const getIndex = (index, data) => {
    if (index === 'first')
        return 0;
    if (index === 'last')
        return data.length - 1;
    return index;
};
