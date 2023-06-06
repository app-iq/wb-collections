import { transformFieldValue } from '../../Field/Field';
describe('Field', () => {
    it('should transform value using one function', () => {
        const field = {
            name: 'test',
            title: 'Test',
            transform: (v) => `${v}_xyz`,
        };
        const value = transformFieldValue('test', field, {});
        expect(value).toEqual('test_xyz');
    });
    it('should transform value using array of functions', () => {
        const field = {
            name: 'test',
            title: 'Test',
            transform: [(v) => `${v}_x`, (v) => `${v}y`],
        };
        const value = transformFieldValue('test', field, {});
        expect(value).toEqual('test_xy');
    });
    it('should not transform value when transform set to undefined', () => {
        const field = {
            name: 'test',
            title: 'Test',
        };
        const value = transformFieldValue('test', field, {});
        expect(value).toEqual('test');
    });
    it('should return same value when transforming using empty array', () => {
        const field = {
            name: 'test',
            title: 'Test',
            transform: [],
        };
        const value = transformFieldValue('test', field, {});
        expect(value).toEqual('test');
    });
});
