import { Field, transformFieldValue } from '../../Field/Field';

describe('Field', () => {
    it('should transform value using one function', () => {
        const field: Field = {
            name: 'test',
            title: 'Test',
            transform: (v: unknown) => `${v}_xyz`,
        };
        const value = transformFieldValue('test', field, {});
        expect(value).toEqual('test_xyz');
    });

    it('should transform value using array of functions', () => {
        const field: Field = {
            name: 'test',
            title: 'Test',
            transform: [(v: unknown) => `${v}_x`, (v: unknown) => `${v}y`],
        };
        const value = transformFieldValue('test', field, {});
        expect(value).toEqual('test_xy');
    });

    it('should not transform value when transform set to undefined', () => {
        const field: Field = {
            name: 'test',
            title: 'Test',
        };
        const value = transformFieldValue('test', field, {});
        expect(value).toEqual('test');
    });

    it('should return same value when transforming using empty array', () => {
        const field: Field = {
            name: 'test',
            title: 'Test',
            transform: [],
        };
        const value = transformFieldValue('test', field, {});
        expect(value).toEqual('test');
    });
});
