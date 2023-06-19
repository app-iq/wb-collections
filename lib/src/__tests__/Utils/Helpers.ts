import { initialState, State } from '../../Data/State';

export function buildState(state: Partial<State>): State {
    return {
        ...initialState,
        ...state,
    };
}
