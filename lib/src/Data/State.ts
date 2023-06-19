export interface State {
    loading: boolean;
    error: unknown;
    items: unknown[];
    pageSize?: number; // TODO: can be moved to props
    totalCount: number;
    page: number;
}

export const initialState: State = {
    items: [],
    loading: false,
    error: undefined,
    totalCount: 0,
    page: 0,
};
