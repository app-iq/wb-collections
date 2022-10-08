import {Field} from '../Field/Field';

export interface State {
    fields: Field[];
    visibleFields: string[];
    loading: boolean;
    error: unknown;
    allItems: unknown[];
    start: number;
    pageSize?: number;
    totalCount: number;
    page: number;
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
    start: 0,
    loading: false,
    error: undefined,
    totalCount: 0,
    page: 0
};
