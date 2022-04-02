import { HttpFetchOptions } from './../Service/Fetch/HttpFetchService';
import { Field } from './../Field/Field';
import { RenderOptions } from './Types/OptionsState';
import { BasicFetchOptions } from '../Service/Fetch/BasicFetchService';

export type FetchOptions = HttpFetchOptions | BasicFetchOptions;

export interface State {
    fields: Field[];
    loading: boolean;
    error: unknown;
    items: unknown[];
    totalCount: number;
    options: {
        render: RenderOptions;
        fetch: FetchOptions;
    };
}

export function buildInitialState(override: Partial<State> = {}): State {
    return {
        ...INITIAL_STATE,
        ...override
    }
}

export const INITIAL_STATE: State = {
    fields: [],
    items: [],
    loading: false,
    error: undefined,
    totalCount: 0,
    options: {
        render: {},
        fetch: {
            data: [],
        },
    },
};
