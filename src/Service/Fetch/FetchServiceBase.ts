import { FetchActions } from './../../Data/Fetch/FetchAction';
import { DispatchFunction } from 'wbox-context/dist/Context/DispatchContext';
import { FetchService } from './FetchService';

export abstract class FetchServiceBase implements FetchService {
    private readonly dispatch: DispatchFunction;
    private shouldCancel = false;

    constructor(dispatch: DispatchFunction) {
        this.dispatch = dispatch;
    }

    async fetch(): Promise<void> {
        this.shouldCancel = false;
        this.dispatch(FetchActions.start());
        try {
            const data = await this.fetchData();
            if (this.shouldCancel) {
                return;
            }
            this.dispatch(FetchActions.done(data.items));
            this.dispatch(FetchActions.setTotalCount(data.totalCount));
        } catch (e) {
            if (this.shouldCancel) {
                return;
            }
            this.dispatch(FetchActions.fail(e));
        }
    }

    async fetchMore(): Promise<void> {
        this.shouldCancel = false;
        this.dispatch(FetchActions.loading(true));
        try {
            const data = await this.fetchMoreData();
            if (this.shouldCancel) {
                return;
            }
            this.dispatch(FetchActions.appendItems(data.items));
            this.dispatch(FetchActions.setTotalCount(data.totalCount));
        } catch (e) {
            if (this.shouldCancel) {
                return;
            }
            this.dispatch(FetchActions.error(e));
        } finally {
            this.dispatch(FetchActions.loading(false));
        }
    }

    cancel(): void {
        this.shouldCancel = true;
    }

    protected abstract fetchData(): Promise<DataResult>;
    protected abstract fetchMoreData(): Promise<DataResult>;
}

export interface DataResult {
    totalCount: number;
    items: unknown[];
}
