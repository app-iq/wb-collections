import { INITIAL_STATE, State } from "../Data/State";

export function buildState(state: Partial<State>): State {
    return {
        ...INITIAL_STATE,
        ...state
    };
}