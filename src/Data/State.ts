import { Field } from './../Field/Field';
import { RenderOptions } from './Types/OptionsState';
export interface State {
    fields: Field[];
    loading: boolean;
    error: unknown;
    data: unknown[];
    options: {
        render: RenderOptions;
    };
}

export const INITIAL_STATE: State = {
    fields: [],
    data: [],
    loading: false,
    error: undefined,
    options: {
        render: {},
    },
};
