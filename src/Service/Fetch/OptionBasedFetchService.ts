import { DispatchFunction } from 'wbox-context';
import { FetchServiceBase } from './FetchServiceBase';

export class OptionBasedFetchService extends FetchServiceBase {
    private readonly options: DirectFetchOptions;

    public constructor(dispatch: DispatchFunction, options: DirectFetchOptions) {
        super(dispatch);
        this.options = options;
    }

    protected fetchData(): Promise<unknown[]> {
        return new Promise<unknown[]>(resolve => {
            resolve(this.options.data);
        });
    }
}

export interface DirectFetchOptions {
    data: unknown[];
}
