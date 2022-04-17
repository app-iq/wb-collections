import { State } from './../../Data/State';
import { CollectionsDefaults } from './../../Defaults/DefaultsContext';
import { DispatchFunction } from 'wbox-context';
import { FetchServiceBase, DataResult } from './FetchServiceBase';

export class HttpFetchService extends FetchServiceBase {
    private readonly options: HttpFetchOptions;
    private readonly defaults: CollectionsDefaults;
    private readonly state: State;

    constructor(dispatch: DispatchFunction, state: State, options: HttpFetchOptions, defaults: CollectionsDefaults) {
        super(dispatch);
        this.options = options;
        this.defaults = defaults;
        this.state = state;
    }

    protected fetchData(): Promise<DataResult> {
        const customFetch = this.options.fetch;
        if (customFetch) {
            return customFetch();
        }
        return this.sendRequest(false);
    }

    protected fetchNextPageData(): Promise<DataResult> {
        return this.sendRequest(true);
    }

    private async sendRequest(isNextPage: boolean) {
        let url = this.getValueFromFunctionOrPermitiveType(this.options.url);
        const parseResponse = this.options.parseResponse ?? this.defaults.httpFetcher.parseResponse;
        const buildData = this.options.buildDataResult ?? this.defaults.httpFetcher.buildDataResult;
        const headers = this.options.headers ?? this.defaults.httpFetcher.headers;
        let options: RequestInit = {
            method: this.options.method ?? this.defaults.httpFetcher.method,
            body: this.getValueFromFunctionOrPermitiveType(this.options.body),
            headers: this.getValueFromFunctionOrPermitiveType(headers),
            ...this.defaults.httpFetcher.requestOptions,
            ...(this.options.fetchOptions ?? {}),
        };

        if (isNextPage) {
            const nextPageOptions: NextPageOptionCallback =
                this.options.nextPageOptions ?? this.defaults.httpFetcher.nextPageOptions;
            const { url: npUrl, options: npOptions } = nextPageOptions(url , options, this.state.totalCount, this.state.allItems , this.state.page , this.state.pageSize);
            options = npOptions;
            url = npUrl;
        }

        return fetch(url, options)
            .then(data => parseResponse(data))
            .then(res => buildData(res));
    }

    private getValueFromFunctionOrPermitiveType<T>(value: FunctionOrPermitiveType<T>): T {
        if (typeof value === 'function') {
            const func = value as (totalCount: number, data: unknown[]) => T;
            return func(this.state.totalCount, this.state.allItems);
        }
        return value;
    }
}

type FunctionOrPermitiveType<T> = ((totalCount: number, data: unknown[]) => T) | T;
export type NextPageOptionCallback = (
    url: string,
    options: RequestInit,
    totalCount: number,
    items: unknown[],
    page: number,
    pageSize: number | undefined
) => { url: string; options: RequestInit };
export interface HttpFetchOptions {
    url: FunctionOrPermitiveType<string>;
    method?: string;
    body?: FunctionOrPermitiveType<BodyInit>;
    headers?: FunctionOrPermitiveType<HeadersInit>;
    fetchOptions?: RequestInit;
    parseResponse?: (response: Response) => Promise<unknown>;
    buildDataResult?: (parsedResponse: unknown) => DataResult;
    nextPageOptions?: NextPageOptionCallback;
    fetch?: () => Promise<DataResult>;
    data?: never;
}
