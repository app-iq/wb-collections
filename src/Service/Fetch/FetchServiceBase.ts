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
        this.dispatch(FetchActions.setData([]));
        await this.handleFetch(() => this.fetchData());
    }

    async fetchNextPage(): Promise<void> {
        await this.handleFetch(() => this.fetchNextPageData());
    }

    async handleFetch(fetchCallback: () => Promise<DataResult>): Promise<void> {
        this.shouldCancel = false;
        this.dispatch(FetchActions.setLoading(true));
        this.dispatch(FetchActions.setError(null));
        try {
            const data = await fetchCallback();
            if (this.shouldCancel) {
                return;
            }
            this.dispatch(FetchActions.appendData(data.items));
            this.dispatch(FetchActions.setTotalCount(data.totalCount));
            this.dispatch(FetchActions.setLoading(false));
            this.dispatch(FetchActions.setError(null));
        } catch (e) {
            if (this.shouldCancel) {
                return;
            }
            this.dispatch(FetchActions.setError(e));
            this.dispatch(FetchActions.setLoading(false));
        }
    }

    cancel(): void {
        this.shouldCancel = true;
        this.dispatch(FetchActions.setLoading(false));
        this.dispatch(FetchActions.setError(null));
    }

    protected abstract fetchData(): Promise<DataResult>;
    protected abstract fetchNextPageData(): Promise<DataResult>;
}

export interface DataResult {
    totalCount: number;
    items: unknown[];
}
