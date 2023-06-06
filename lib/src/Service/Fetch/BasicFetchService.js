import { FetchServiceBase } from './FetchServiceBase';
export class BasicFetchService extends FetchServiceBase {
    options;
    constructor(dispatch, options) {
        super(dispatch);
        this.options = options;
    }
    fetchData() {
        return new Promise(resolve => {
            resolve({
                items: this.options.data,
                totalCount: this.options.data.length,
            });
        });
    }
    fetchMoreData() {
        throw Error('BasicFetchService doesn\'t support pagination');
    }
    fetchPageData() {
        throw Error('BasicFetchService doesn\'t support pagination');
    }
}
