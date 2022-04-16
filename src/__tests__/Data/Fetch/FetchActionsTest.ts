import { FetchActions, FetchActionType } from './../../../Data/Fetch/FetchAction';
describe('Fetch Actions', () => {
    it('should return start action', () => {
        const action = FetchActions.start();
        expect(action).toEqual({
            type: FetchActionType.FETCH_START,
            payload: undefined,
        });
    });

    it('should return fail action', () => {
        const exception = {};
        const action = FetchActions.fail(exception);
        expect(action).toEqual({
            type: FetchActionType.FETCH_FAIL,
            payload: exception,
        });
    });

    it('should return done action', () => {
        const data = [{} , {}];
        const action = FetchActions.done(data);
        expect(action).toEqual({
            type: FetchActionType.FETCH_DONE,
            payload: data,
        });
    });

    it('should return startMore action', () => {
        const action = FetchActions.moreStarted();
        expect(action).toEqual({
            type: FetchActionType.FETCH_MORE_START,
            payload: undefined,
        });
    });

    it('should return moreFailed action', () => {
        const exception = {};
        const action = FetchActions.moreFailed(exception);
        expect(action).toEqual({
            type: FetchActionType.FETCH_MORE_FAIL,
            payload: exception,
        });
    });

    it('should return moreDone action', () => {
        const data = [{} , {} , {}];
        const action = FetchActions.moreDone(data);
        expect(action).toEqual({
            type: FetchActionType.FETCH_MORE_DONE,
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
 