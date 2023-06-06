import { FieldsActionType } from './FieldsActions';
export const fieldsReducer = (state, action) => {
    switch (action.type) {
        case FieldsActionType.SET:
            return setFields(state, action.payload);
        case FieldsActionType.TOGGLE_VISIBILITY:
            return toggleVisibility(state, action.payload);
        case FieldsActionType.MOVE:
            return move(state, action.payload);
    }
    return state;
};
function setFields(state, fields) {
    return { ...state, fields: fields, visibleFields: fields.map(f => f.name) };
}
function toggleVisibility(state, fieldName) {
    const visibleFields = [...state.visibleFields];
    const index = visibleFields.indexOf(fieldName);
    if (index > -1) {
        visibleFields.splice(index, 1);
    }
    else {
        visibleFields.push(fieldName);
    }
    return { ...state, visibleFields: visibleFields };
}
function move(state, payload) {
    const fields = [...state.fields];
    const currentIndex = fields.findIndex(field => field.name === payload.fieldName);
    const field = { ...state.fields[currentIndex] };
    const insertIndex = payload.position < currentIndex ? payload.position : payload.position + 1;
    fields.splice(insertIndex, 0, field);
    const removeIndex = payload.position < currentIndex ? currentIndex + 1 : currentIndex;
    fields.splice(removeIndex, 1);
    return { ...state, fields: fields };
}
