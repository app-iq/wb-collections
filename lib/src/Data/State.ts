import { Field } from '../Field/Field';

export interface State {
    fields: Field[];
    visibleFields: string[];
    loading: boolean;
    error: unknown;
    items: unknown[];
    pageSize?: number;
    totalCount: number;
    page: number;
}

const initialState: State = {
    fields: [],
    visibleFields: [],
    items: [],
    loading: false,
    error: undefined,
    totalCount: 0,
    page: 0,
};

export function buildInitialState(override: Partial<State> = {}): State {
    return {
        ...initialState,
        ...override,
    };
}
