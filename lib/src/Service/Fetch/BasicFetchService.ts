import { DispatchFunction } from 'wb-provider';
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

    protected fetchMoreData(): Promise<DataResult> {
        throw Error("BasicFetchService doesn't support infinite loading");
    }

    protected fetchPageData(): Promise<DataResult> {
        throw Error("BasicFetchService doesn't support pagination");
    }
}

export interface BasicFetchOptions {
    data: unknown[];
}
