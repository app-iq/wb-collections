import { INITIAL_STATE } from '../../Data/State';
export function buildState(state) {
    return {
        ...INITIAL_STATE,
        ...state,
    };
}
