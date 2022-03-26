import { DispatchFunction } from 'wbox-context';
import { FetchServiceBase } from './FetchServiceBase';

// TODO : HANDLE DEFAUTLS
export class HttpFetchService extends FetchServiceBase {
    private readonly options: HttpFetchOptions;

    constructor(dispatch: DispatchFunction, options: HttpFetchOptions) {
        super(dispatch);
        this.options = options;
    }

    protected fetchData(): Promise<unknown[]> {
        const customFetch = this.options.fetch;
        if (customFetch) {
            return customFetch();
        }
        return this.sendRequest();
    }

    private async sendRequest() {
        const url = this.options.url;
        const extractData = this.options.extractDataFromResponse ?? ((res:Response) => res.json());
        return fetch(url, {
            // TODO : put defaults options here
            method: this.options.method ?? 'GET',
            body: this.options.body,
            headers: this.options.headers ?? {
                'Content-Type': 'application/json',
            },
            ...(this.options.fetchOptions ?? {}),
        }).then(data => extractData(data));
    }
}

export interface HttpFetchOptions {
    data: never;
    fetch?: () => Promise<unknown[]>;
    url: string;
    method?: string;
    body?: BodyInit;
    headers?: HeadersInit;
    fetchOptions?: RequestInit;
    extractDataFromResponse?: (response: Response) => unknown[];
}
