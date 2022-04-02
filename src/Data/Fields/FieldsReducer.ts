import { Field } from './../../Field/Field';
import { FieldsAction, FieldsActionType } from './FieldsActions';
import { State } from './../State';
import { Reducer } from 'wbox-context';

export const fieldsReducer: Reducer<State, FieldsAction<unknown>> = (state, action) => {
    switch (action.type) {
        case FieldsActionType.SET:
            return { ...state, fields: action.payload as Field[] };
    }
    return state;
};
