import { BasicFetchService } from './Fetch/BasicFetchService';
import { HttpFetchService } from './Fetch/HttpFetchService';
export class DefaultServiceFactory {
    state;
    dispatch;
    defaults;
    props;
    constructor(state, dispatch, defaults, props) {
        this.state = state;
        this.dispatch = dispatch;
        this.defaults = defaults;
        this.props = props;
    }
    createBasicFetchService() {
        return new BasicFetchService(this.dispatch, this.props.fetchOptions);
    }
    createHttpFetchService() {
        return new HttpFetchService(this.dispatch, this.state, this.props.fetchOptions, this.defaults);
    }
}
