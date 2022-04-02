import { CollectionsDefaults } from './../../Defaults/DefaultsContext';
import { DispatchFunction } from 'wbox-context';
import { FetchServiceBase, DataResult } from './FetchServiceBase';

export class HttpFetchService extends FetchServiceBase {
    private readonly options: HttpFetchOptions;
    private readonly defaults: CollectionsDefaults;

    constructor(dispatch: DispatchFunction, options: HttpFetchOptions, defaults: CollectionsDefaults) {
        super(dispatch);
        this.options = options;
        this.defaults = defaults;
    }

    protected fetchData(): Promise<DataResult> {
        console.log(this);
        const customFetch = this.options.fetch;
        if (customFetch) {
            return customFetch();
        }
        return this.sendRequest();
    }

    private async sendRequest() {
        const url = this.options.url;
        const parseResponse = this.options.parseResponse ?? this.defaults.httpFetcher.parseResponse;
        const buildData = this.options.buildDataResult ?? this.defaults.httpFetcher.buildDataResult;
        const options = {
            method: this.options.method ?? this.defaults.httpFetcher.method,
            body: this.options.body,
            headers: this.options.headers ?? this.defaults.httpFetcher.headers,
            ...this.defaults.httpFetcher.requestOptions,
            ...(this.options.fetchOptions ?? {}),
        };
        return fetch(url, options)
            .then(data => parseResponse(data))
            .then(res => buildData(res));
    }
}

export interface HttpFetchOptions {
    url: string;
    method?: string;
    body?: BodyInit;
    headers?: HeadersInit;
    fetchOptions?: RequestInit;
    parseResponse?: (response: Response) => Promise<unknown>;
    buildDataResult?: (parsedResponse: unknown) => DataResult;
    fetch?: () => Promise<DataResult>;
    data?: never;
}
