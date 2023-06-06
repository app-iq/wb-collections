export var FetchActionType;
(function (FetchActionType) {
    FetchActionType["SET_LOADING"] = "FETCH_ACTION@SET_START";
    FetchActionType["APPEND_DATA"] = "FETCH_ACTION@APPEND_DATA";
    FetchActionType["SET_DATA"] = "FETCH_ACTION@SET_DATA";
    FetchActionType["SET_ERROR"] = "FETCH_ACTION@SET_ERROR";
    FetchActionType["SET_TOTAL_COUNT"] = "FETCH_ACTION@SET_TOTAL_COUNT";
})(FetchActionType || (FetchActionType = {}));
export class FetchActions {
    static setLoading(loading) {
        return {
            type: FetchActionType.SET_LOADING,
            payload: loading,
        };
    }
    static setData(data) {
        return {
            type: FetchActionType.SET_DATA,
            payload: data,
        };
    }
    static appendData(data) {
        return {
            type: FetchActionType.APPEND_DATA,
            payload: data,
        };
    }
    static setError(error) {
        return {
            type: FetchActionType.SET_ERROR,
            payload: error,
        };
    }
    static setTotalCount(totalCount) {
        return {
            type: FetchActionType.SET_TOTAL_COUNT,
            payload: totalCount,
        };
    }
}
