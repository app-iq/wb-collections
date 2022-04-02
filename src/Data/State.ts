import { HttpFetchOptions } from './../Service/Fetch/HttpFetchService';
import { Field } from './../Field/Field';
import { RenderOptions } from './Types/OptionsState';
import { SimpleFetchOptions } from '../Service/Fetch/OptionBasedFetchService';

export type FetchOptions = HttpFetchOptions | SimpleFetchOptions;

export interface State {
    fields: Field[];
    loading: boolean;
    error: unknown;
    data: unknown[];
    options: {
        render: RenderOptions;
        fetch: FetchOptions;
    };
}

export const INITIAL_STATE: State = {
    fields: [],
    data: [],
    loading: false,
    error: undefined,
    options: {
        render: {},
        fetch: {
            data: [],
        },
    },
};
