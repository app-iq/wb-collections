import { ModificationActions } from '../../Data/Modification/ModificationAction';
import { modificationReducer } from '../../Data/Modification/ModificationReducer';
import { buildState } from '../Utils/Helpers';

describe('Modification Reducer', () => {
    it('should insert first', () => {
        const items = [{ value: 'test_1' }];
        const state = buildState({
            items,
        });
        const action = ModificationActions.insertFirst({ value: 'test_2' });
        const newState = modificationReducer(state, action);
        expect(newState).toEqual(
            buildState({
                items: [{ value: 'test_2' }, ...items],
            })
        );
    });

    it('should insert last', () => {
        const items = [{ value: 'test_1' }];
        const state = buildState({
            items,
        });
        const action = ModificationActions.insertLast({ value: 'test_2' });
        const newState = modificationReducer(state, action);
        expect(newState).toEqual(
            buildState({
                items: [...items, { value: 'test_2' }],
            })
        );
    });

    it('should insert at index', () => {
        const items = [{ value: 'test_1' }, { value: 'test_2' }];
        const state = buildState({
            items,
        });
        const action = ModificationActions.insertAt({ value: 'test_3' }, 1);
        const newState = modificationReducer(state, action);
        expect(newState).toEqual(
            buildState({
                items: [{ value: 'test_1' }, { value: 'test_3' }, { value: 'test_2' }],
            })
        );
    });

    it('should remove first', () => {
        const items = [{ value: 'test_1' }, { value: 'test_2' }];
        const state = buildState({
            items,
        });
        const action = ModificationActions.removeFirst();
        const newState = modificationReducer(state, action);
        expect(newState).toEqual(
            buildState({
                items: [{ value: 'test_2' }],
            })
        );
    });

    it('should remove last', () => {
        const items = [{ value: 'test_1' }, { value: 'test_2' }];
        const state = buildState({
            items,
        });
        const action = ModificationActions.removeLast();
        const newState = modificationReducer(state, action);
        expect(newState).toEqual(
            buildState({
                items: [{ value: 'test_1' }],
            })
        );
    });

    it('should remove at index', () => {
        const items = [{ value: 'test_1' }, { value: 'test_2' }, { value: 'test_3' }];
        const state = buildState({
            items,
        });
        const action = ModificationActions.remove(1);
        const newState = modificationReducer(state, action);
        expect(newState).toEqual(
            buildState({
                items: [{ value: 'test_1' }, { value: 'test_3' }],
            })
        );
    });

    it('should update at index', () => {
        const items = [{ value: 'test_1' }, { value: 'test_2' }, { value: 'test_3' }];
        const state = buildState({
            items,
        });
        const action = ModificationActions.update({ value: 'updated', test: true }, 1);
        const newState = modificationReducer(state, action);
        expect(newState).toEqual(
            buildState({
                items: [{ value: 'test_1' }, { value: 'updated', test: true }, { value: 'test_3' }],
            })
        );
    });
});
