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
        this.handleStart();
        try {
            const data = await this.fetchData();
            if (this.shouldCancel) {
                this.handleCancel();
                return;
            }
            this.handleDone(data.items);
        } catch (e) {
            if (!this.shouldCancel) {
                this.handleError(e);
            } else {
                this.handleCancel();
            }
        }
    }

    cancel(): void {
        this.shouldCancel = true;
    }

    protected abstract fetchData(): Promise<DataResult>;

    protected handleStart(): void {
        this.dispatch(FetchActions.start());
    }

    protected handleDone(data: unknown[]): void {
        this.dispatch(FetchActions.done(data));
    }

    protected handleError(error: unknown): void {
        this.dispatch(FetchActions.fail(error));
    }

    protected handleCancel(): void {
        // TODO : handle cancel
    }
}


export interface DataResult {
    totalCount: number;
    items: unknown[];
}