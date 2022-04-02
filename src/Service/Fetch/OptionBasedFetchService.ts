import { DispatchFunction } from 'wbox-context';
import { DataResult, FetchServiceBase } from './FetchServiceBase';

export class OptionBasedFetchService extends FetchServiceBase {
    private readonly options: DirectFetchOptions;

    public constructor(dispatch: DispatchFunction, options: DirectFetchOptions) {
        super(dispatch);
        this.options = options;
    }

    protected fetchData(): Promise<DataResult> {
        return new Promise<DataResult>(resolve => {
            resolve({
                items: this.options.data,
                totalCount: this.options.data.length
            });
        });
    }
}

export interface DirectFetchOptions {
    data: unknown[];
}
