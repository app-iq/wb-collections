import { DataResult } from './FetchServiceBase';
import { FetchPageOptionCallback } from './HttpFetchService';

type OptionResolver<T> = (totalCount: number, data: unknown[]) => T;

export interface HttpFetchOptions {
    url: OptionResolver<string> | string;
    method?: string;
    body?: OptionResolver<BodyInit> | BodyInit;
    headers?: OptionResolver<HeadersInit> | HeadersInit;
    fetchOptions?: RequestInit;
    parseResponse?: (response: Response) => Promise<unknown>;
    buildDataResult?: (parsedResponse: unknown) => DataResult;
    fetchPageOptions?: FetchPageOptionCallback;
    fetch?: () => Promise<DataResult>;
}
