export var PaginationActionType;
(function (PaginationActionType) {
    PaginationActionType["RESET_PAGE"] = "FETCH_ACTION@RESET_PAGE";
    PaginationActionType["NEXT_PAGE"] = "FETCH_ACTION@NEXT_PAGE";
    PaginationActionType["PREVIOUS_PAGE"] = "FETCH_ACTION@PREV_PAGE";
    PaginationActionType["SET_PAGE"] = "FETCH_ACTION@SET_PAGE";
    PaginationActionType["SET_START_FROM"] = "FETCH_ACTION@SET_START_FROM";
    PaginationActionType["SET_PAGE_SIZE"] = "FETCH_ACTION@SET_PAGE_SIZE";
})(PaginationActionType || (PaginationActionType = {}));
export class PaginationActions {
    static setPage(page) {
        return {
            type: PaginationActionType.SET_PAGE,
            payload: page,
        };
    }
    static nextPage() {
        return {
            type: PaginationActionType.NEXT_PAGE,
            payload: undefined,
        };
    }
    static previousPage() {
        return {
            type: PaginationActionType.PREVIOUS_PAGE,
            payload: undefined,
        };
    }
    static resetPage() {
        return {
            type: PaginationActionType.RESET_PAGE,
            payload: undefined,
        };
    }
    static setStart(start) {
        return {
            type: PaginationActionType.SET_START_FROM,
            payload: start,
        };
    }
    static setPageSize(pageSize) {
        return {
            type: PaginationActionType.SET_PAGE_SIZE,
            payload: pageSize,
        };
    }
    static setNotLimitedPageSize() {
        return {
            type: PaginationActionType.SET_PAGE_SIZE,
            payload: undefined,
        };
    }
}
