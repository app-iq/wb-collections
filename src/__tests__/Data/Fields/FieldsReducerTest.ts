import { FieldsActions, FieldsActionType } from "../../../Data/Fields/FieldsActions";
import { fieldsReducer } from "../../../Data/Fields/FieldsReducer";
import { Field } from "../../../Field/Field";
import { buildState } from "../../../TestHelpers/Helpers";

describe('FieldsReducer', () => {

    it("should handle set fields action", () => {
        const fields: Field[] = [{ name: 'test1', title: 'Test 1' }, { name: 'test2', title: 'Test 2' }];
        const state = buildState({});
        const action = FieldsActions.set(fields);
        const newState = fieldsReducer(state, action);
        expect(newState).toEqual(buildState({
            fields: fields,
            visibleFields: ['test1', 'test2']
        }));
    });


    it("should handle toggle visibility action / remove field", () => {
        const fields: Field[] = [{ name: 'test1', title: 'Test 1' }, { name: 'test2', title: 'Test 2' }];
        const state = buildState({
            fields: fields,
            visibleFields: ['test1', 'test2']
        });
        const action = FieldsActions.toggleVisibility('test2');
        const newState = fieldsReducer(state, action);
        expect(newState).toEqual(buildState({
            fields: fields,
            visibleFields: ['test1']
        }));
    });

    it("should handle toggle visibility action / add field", () => {
        const fields: Field[] = [{ name: 'test1', title: 'Test 1' }, { name: 'test2', title: 'Test 2' }];
        const state = buildState({
            fields: fields,
            visibleFields: ['test2']
        });
        const action = FieldsActions.toggleVisibility('test1');
        const newState = fieldsReducer(state, action);
        expect(newState).toEqual(buildState({
            fields: fields,
            visibleFields: ['test2', 'test1']
        }));
    });

    it("should handle move action / move back", () => {
        const fields: Field[] = [
            { name: 'test1', title: 'Test 1' },
            { name: 'test2', title: 'Test 2' },
            { name: 'test3', title: 'Test 3' },
            { name: 'test4', title: 'Test 4' }
        ];
        const state = buildState({
            fields: fields
        });
        const action = FieldsActions.move('test3', 0);
        const newState = fieldsReducer(state, action);

        const newFields: Field[] = [
            { name: 'test3', title: 'Test 3' },
            { name: 'test1', title: 'Test 1' },
            { name: 'test2', title: 'Test 2' },
            { name: 'test4', title: 'Test 4' }
        ];

        expect(newState).toEqual(buildState({
            fields: newFields,
        }));
    });

    it("should handle move action / move foreword", () => {
        const fields: Field[] = [
            { name: 'test1', title: 'Test 1' },
            { name: 'test2', title: 'Test 2' },
            { name: 'test3', title: 'Test 3' },
            { name: 'test4', title: 'Test 4' }
        ];
        const state = buildState({
            fields: fields
        });
        const action = FieldsActions.move('test1', 2);
        const newState = fieldsReducer(state, action);

        const newFields: Field[] = [
            { name: 'test2', title: 'Test 2' },
            { name: 'test3', title: 'Test 3' },
            { name: 'test1', title: 'Test 1' },
            { name: 'test4', title: 'Test 4' }
        ];

        expect(newState).toEqual(buildState({
            fields: newFields,
        }));
    });

    it("should handle move action / same place", () => {
        const fields: Field[] = [
            { name: 'test1', title: 'Test 1' },
            { name: 'test2', title: 'Test 2' },
            { name: 'test3', title: 'Test 3' },
            { name: 'test4', title: 'Test 4' }
        ];
        const state = buildState({
            fields: fields
        });
        const action = FieldsActions.move('test2', 1);
        const newState = fieldsReducer(state, action);

        const newFields: Field[] = [...fields];

        expect(newState).toEqual(buildState({
            fields: newFields,
        }));
    });

});