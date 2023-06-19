import { DispatchFunction } from 'wb-core-provider';
import { State } from '../../Data/State';
import { DataResult, FetchServiceBase } from './FetchServiceBase';

export interface HttpFetchOptions {
    url: ValueOrFunction<string>;
    method?: string;
    body?: ValueOrFunction<BodyInit>;
    headers?: ValueOrFunction<HeadersInit>;
    fetchOptions?: RequestInit;
    parseResponse?: (response: Response) => Promise<unknown>;
    buildDataResult?: (parsedResponse: unknown) => DataResult;
    fetchPageOptions?: FetchPageOptionCallback;
    fetch?: () => Promise<DataResult>;
}

const defaultParseResponse = (response: Response) => response.json();

const defaultBuildDataResult = (parsedResponse: unknown) => {
    const res = parsedResponse as unknown[];
    return { totalCount: res.length, items: res };
};

const defaultFetchPageOptions: FetchPageOptionCallback = (url, options, _totalCount, _items, page) => {
    const urlObj = new URL(url);
    urlObj.searchParams.set('page', String(page));
    return {
        url: urlObj.toString(),
        options,
    };
};

export class HttpFetchService extends FetchServiceBase {
    private readonly options: HttpFetchOptions;

    private readonly state: State;

    constructor(dispatch: DispatchFunction, state: State, options: HttpFetchOptions) {
        super(dispatch);
        this.options = options;
        this.state = state;
    }

    protected fetchData(): Promise<DataResult> {
        const customFetch = this.options.fetch;
        if (customFetch) {
            return customFetch();
        }
        return this.sendRequest();
    }

    protected fetchMoreData(): Promise<DataResult> {
        return this.sendRequest({ isNextPage: true });
    }

    protected fetchPageData(page: number): Promise<DataResult> {
        return this.sendRequest({ page });
    }

    private async sendRequest(pageOptions: { isNextPage?: boolean; page?: number } = {}) {
        let url = this.getValueOrFunction(this.options.url);
        const parseResponse = this.options.parseResponse ?? defaultParseResponse;
        const buildData = this.options.buildDataResult ?? defaultBuildDataResult;
        const headers = this.options.headers ?? {
            'Content-Type': 'application/json',
        };
        let options: RequestInit = {
            method: this.options.method ?? 'GET',
            body: this.getValueOrFunction(this.options.body),
            headers: this.getValueOrFunction(headers),
            ...(this.options.fetchOptions ?? {}),
        };

        if (pageOptions.isNextPage || pageOptions.page) {
            const page = pageOptions.isNextPage ? this.state.page + 1 : Number(pageOptions.page);
            const fetchPageOptions: FetchPageOptionCallback = this.options.fetchPageOptions ?? defaultFetchPageOptions;
            const { url: npUrl, options: npOptions } = fetchPageOptions(
                url,
                options,
                this.state.totalCount,
                this.state.items,
                page,
                this.state.pageSize
            );
            options = npOptions;
            url = npUrl;
        }

        return fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res;
            })
            .then(data => parseResponse(data))
            .then(res => buildData(res));
    }

    private getValueOrFunction<T>(value: ValueOrFunction<T>): T {
        if (typeof value === 'function') {
            const func = value as (totalCount: number, data: unknown[]) => T;
            return func(this.state.totalCount, this.state.items);
        }
        return value;
    }
}

type ValueOrFunction<T> = ((totalCount: number, data: unknown[]) => T) | T;
export type FetchPageOptionCallback = (
    url: string,
    options: RequestInit,
    totalCount: number,
    items: unknown[],
    page: number,
    pageSize: number | undefined
) => { url: string; options: RequestInit };
