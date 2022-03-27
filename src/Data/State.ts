import { Field } from './../Field/Field';
export interface State {
    fields: { [fieldName: string]: Field };
    loading: boolean;
    error: unknown;
    data: unknown[];
}

export const INITIAL_STATE: State = {
    fields: {},
    data: [],
    loading: false,
    error: undefined,
};
