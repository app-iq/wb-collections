import { Field } from './../Field/Field';
export interface State {
    fields: { [fieldName: string]: Field };
    fetch: {
        loading: boolean;
        error: unknown;
        data: unknown[];
    };
}

export const INITIAL_STATE: State = {
    fields: {},
    fetch: {
        loading: false,
        error: undefined,
        data: [],
    },
};
