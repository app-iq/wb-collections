import { FetchServiceBase } from './FetchServiceBase';
export class HttpFetchService extends FetchServiceBase {
    options;
    defaults;
    state;
    constructor(dispatch, state, options, defaults) {
        super(dispatch);
        this.options = options;
        this.defaults = defaults;
        this.state = state;
    }
    fetchData() {
        const customFetch = this.options.fetch;
        if (customFetch) {
            return customFetch();
        }
        return this.sendRequest();
    }
    fetchMoreData() {
        return this.sendRequest({ isNextPage: true });
    }
    fetchPageData(page) {
        return this.sendRequest({ page: page });
    }
    async sendRequest(pageOptions = {}) {
        let url = this.getValueFromFunctionOrPermitiveType(this.options.url);
        const parseResponse = this.options.parseResponse ?? this.defaults.httpFetcher.parseResponse;
        const buildData = this.options.buildDataResult ?? this.defaults.httpFetcher.buildDataResult;
        const headers = this.options.headers ?? this.defaults.httpFetcher.headers;
        let options = {
            method: this.options.method ?? this.defaults.httpFetcher.method,
            body: this.getValueFromFunctionOrPermitiveType(this.options.body),
            headers: this.getValueFromFunctionOrPermitiveType(headers),
            ...this.defaults.httpFetcher.requestOptions,
            ...(this.options.fetchOptions ?? {}),
        };
        if (pageOptions.isNextPage || pageOptions.page) {
            const page = pageOptions.isNextPage ? this.state.page + 1 : Number(pageOptions.page);
            const fetchPageOptions = this.options.fetchPageOptions ?? this.defaults.httpFetcher.fetchPageOptions;
            const { url: npUrl, options: npOptions } = fetchPageOptions(url, options, this.state.totalCount, this.state.allItems, page, this.state.pageSize);
            options = npOptions;
            url = npUrl;
        }
        return fetch(url, options)
            .then(data => parseResponse(data))
            .then(res => buildData(res));
    }
    getValueFromFunctionOrPermitiveType(value) {
        if (typeof value === 'function') {
            const func = value;
            return func(this.state.totalCount, this.state.allItems);
        }
        return value;
    }
}
