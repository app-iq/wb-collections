import { DispatchFunction } from 'wbox-context';
import { DataResult, FetchServiceBase } from './FetchServiceBase';

export class BasicFetchService extends FetchServiceBase {
    private readonly options: BasicFetchOptions;

    public constructor(dispatch: DispatchFunction, options: BasicFetchOptions) {
        super(dispatch);
        this.options = options;
    }

    protected fetchData(): Promise<DataResult> {
        return new Promise<DataResult>(resolve => {
            resolve({
                items: this.options.data,
                totalCount: this.options.data.length,
            });
        });
    }

    protected fetchNextPageData(): Promise<DataResult> {
        throw Error("BasicFetchService doesn't support pagination");
    }

    protected fetchPageData(): Promise<DataResult> {
        throw Error("BasicFetchService doesn't support pagination");
    }
}

export interface BasicFetchOptions {
    data: unknown[];
}
