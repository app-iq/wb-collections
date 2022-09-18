import {Action} from 'wb-core-provider';
import {Field} from '../../Field/Field';

export enum FieldsActionType {
    SET = 'FIELDS_ACTION@SET',
    TOGGLE_VISIBILITY = 'FIELDS_ACTION@TOGGLE_VISIBILITY',
    MOVE = 'FIELDS_ACTION@MOVE_FIELD'
}

export type FieldsAction<TPayload> = Action<FieldsActionType, TPayload>;

export class FieldsActions {
    public static set(fields: Field[]): FieldsAction<Field[]> {
        return {
            type: FieldsActionType.SET,
            payload: fields,
        };
    }

    public static toggleVisibility(fieldName: string): FieldsAction<string> {
        return {
            type: FieldsActionType.TOGGLE_VISIBILITY,
            payload: fieldName
        };
    }

    public static move(fieldName: string, position: number): FieldsAction<MoveFieldPayload> {
        return {
            type: FieldsActionType.MOVE,
            payload: {
                position: position,
                fieldName: fieldName
            }
        };
    }
}


export interface MoveFieldPayload {
    position: number;
    fieldName: string;
}
