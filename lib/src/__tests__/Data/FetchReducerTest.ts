import { FetchActions } from '../../Data/Fetch/FetchAction';
import { fetchReducer } from '../../Data/Fetch/FetchReducer';
import { initialState, State } from '../../Data/State';

describe('Fetch Reducer', () => {
    function buildState(state: Partial<State>): State {
        return {
            ...initialState,
            ...state,
        };
    }

    it('should handle set loading action', () => {
        const state = buildState({ loading: true });
        const action = FetchActions.setLoading(false);
        const newState = fetchReducer(state, action);
        expect(newState).toEqual(buildState({ loading: false }));
    });

    it('should handle set error action', () => {
        const state = buildState({ error: null });
        const action = FetchActions.setError('error');
        const newState = fetchReducer(state, action);
        expect(newState).toEqual(buildState({ error: 'error' }));
    });

    it('should handle set data action', () => {
        const state = buildState({ items: [{}, {}] });
        const action = FetchActions.setData([{}]);
        const newState = fetchReducer(state, action);
        expect(newState).toEqual(buildState({ items: [{}] }));
    });

    it('should handle append data action', () => {
        const state = buildState({ items: [{}] });
        const action = FetchActions.appendData([{}]);
        const newState = fetchReducer(state, action);
        expect(newState).toEqual(buildState({ items: [{}, {}] }));
    });

    it('should handle set total count action', () => {
        const state = buildState({ totalCount: 20 });
        const action = FetchActions.setTotalCount(100);
        const newState = fetchReducer(state, action);
        expect(newState).toEqual(buildState({ totalCount: 100 }));
    });
});
