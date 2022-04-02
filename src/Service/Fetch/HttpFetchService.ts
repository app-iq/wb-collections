import { DispatchFunction } from 'wbox-context';
import { FetchServiceBase, DataResult } from './FetchServiceBase';

// TODO : HANDLE DEFAUTLS
export class HttpFetchService extends FetchServiceBase {
    private readonly options: HttpFetchOptions;

    constructor(dispatch: DispatchFunction, options: HttpFetchOptions) {
        super(dispatch);
        this.options = options;
    }

    protected fetchData(): Promise<DataResult> {
        console.log('http fetch');
        const customFetch = this.options.fetch;
        if (customFetch) {
            return customFetch();
        }
        return this.sendRequest();
    }

    private async sendRequest() {
        const url = this.options.url;
        const parseResponse = this.options.parseResponse ?? ((res:Response) => res.json());
        const buildData = this.options.buildData ?? ((res : any) => ({totalCount: res.length , items: res}))
        return fetch(url, {
            // TODO : put defaults options here
            method: this.options.method ?? 'GET',
            body: this.options.body,
            headers: this.options.headers ?? {
                'Content-Type': 'application/json',
            },
            ...(this.options.fetchOptions ?? {}),
        })
        .then(data => parseResponse(data))
        .then(res => buildData(res));
    }
}

export interface HttpFetchOptions {
    data?: never;
    fetch?: () => Promise<DataResult>;
    url: string;
    method?: string;
    body?: BodyInit;
    headers?: HeadersInit;
    fetchOptions?: RequestInit;
    parseResponse?: (response: Response) => unknown;
    buildData?: (parsedResponse: unknown) => DataResult;
}