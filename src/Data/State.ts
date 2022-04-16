import { HttpFetchOptions } from './../Service/Fetch/HttpFetchService';
import { Field } from './../Field/Field';
import { RenderOptions } from './Types/Elements';
import { BasicFetchOptions } from '../Service/Fetch/BasicFetchService';

export type FetchOptions = HttpFetchOptions | BasicFetchOptions;

export interface State {
    fields: Field[];
    visibleFields: string[];
    loading: boolean;
    error: unknown;
    allItems: unknown[];
    start:number;
    end:number;
    totalCount: number;
    page: number;
    options: {
        render: RenderOptions;
        fetch: FetchOptions;
    };
}

export function buildInitialState(override: Partial<State> = {}): State {
    return {
        ...INITIAL_STATE,
        ...override,
    };
}

export const INITIAL_STATE: State = {
    fields: [],
    visibleFields: [],
    allItems: [],
    start:0,
    end:0,
    loading: false,
    error: undefined,
    totalCount: 0,
    page: 0,
    options: {
        render: {},
        fetch: {
            data: [],
        },
    },
};