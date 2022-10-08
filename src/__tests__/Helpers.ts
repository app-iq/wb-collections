import {INITIAL_STATE, State} from '../Data/State';

it('helper', function () {
    expect(true).toEqual(true);
});

export function buildState(state: Partial<State>): State {
    return {
        ...INITIAL_STATE,
        ...state
    };
}
