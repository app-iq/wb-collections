import { Action } from 'wbox-context';
import { Field } from '../../Field/Field';

export enum FieldsActionType {
    SET = 'FIELDS_ACTION@SET',
}

export type FieldsAction<TPayload> = Action<FieldsActionType, TPayload>;

export class FieldsActions {
    public static set(fields: Field[]): FieldsAction<Field[]> {
        return {
            type: FieldsActionType.SET,
            payload: fields,
        };
    }
}
