export function buildInitialState(override = {}) {
    return {
        ...INITIAL_STATE,
        ...override,
    };
}
export const INITIAL_STATE = {
    fields: [],
    visibleFields: [],
    allItems: [],
    start: 0,
    loading: false,
    error: undefined,
    totalCount: 0,
    page: 0,
};
