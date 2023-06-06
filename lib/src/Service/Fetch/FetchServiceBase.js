import { FetchActions } from '../../Data/Fetch/FetchAction';
import { PaginationActions } from '../../Data/Pagination/PaginationActions';
export class FetchServiceBase {
    dispatch;
    shouldCancel = false;
    constructor(dispatch) {
        this.dispatch = dispatch;
    }
    async fetch() {
        await this.handleFetch(() => this.fetchData());
    }
    async fetchMore() {
        await this.handleFetch(() => this.fetchMoreData(), () => this.dispatch(PaginationActions.nextPage()), true);
    }
    async fetchPage(page) {
        await this.handleFetch(() => this.fetchPageData(page), () => this.dispatch(PaginationActions.setPage(page)));
    }
    async handleFetch(fetchCallback, onDone, useAppend = false) {
        this.shouldCancel = false;
        this.dispatch(FetchActions.setLoading(true));
        this.dispatch(FetchActions.setError(null));
        try {
            const data = await fetchCallback();
            if (this.shouldCancel) {
                return;
            }
            if (useAppend) {
                this.dispatch(FetchActions.appendData(data.items));
            }
            else {
                this.dispatch(FetchActions.setData(data.items));
            }
            this.dispatch(FetchActions.setTotalCount(data.totalCount));
            this.dispatch(FetchActions.setLoading(false));
            this.dispatch(FetchActions.setError(null));
            onDone?.();
        }
        catch (e) {
            if (this.shouldCancel) {
                return;
            }
            this.dispatch(FetchActions.setError(e));
            this.dispatch(FetchActions.setLoading(false));
        }
    }
    cancel() {
        this.shouldCancel = true;
        this.dispatch(FetchActions.setLoading(false));
        this.dispatch(FetchActions.setError(null));
    }
}
