import { FetchActions, FetchActionType } from './../../../Data/Fetch/FetchAction';
describe('Fetch Actions', () => {
    it('should return set loading action', () => {
        const action = FetchActions.setLoading(true);
        expect(action).toEqual({
            type: FetchActionType.SET_LOADING,
            payload: true,
        });
    });

    it('should return fail action', () => {
        const exception = {};
        const action = FetchActions.setError(exception);
        expect(action).toEqual({
            type: FetchActionType.SET_ERROR,
            payload: exception,
        });
    });

    it('should return set data action', () => {
        const data = [{} , {}];
        const action = FetchActions.setData(data);
        expect(action).toEqual({
            type: FetchActionType.SET_DATA,
            payload: data,
        });
    });

    it('should return append data action', () => {
        const data = [{} , {}];
        const action = FetchActions.appendData(data);
        expect(action).toEqual({
            type: FetchActionType.APPEND_DATA,
            payload: data,
        });
    });

    it('should return startMore action', () => {
        const totalCount = 10;
        const action = FetchActions.setTotalCount(totalCount);
        expect(action).toEqual({
            type: FetchActionType.SET_TOTAL_COUNT,
            payload: totalCount,
        });
    });

});
 