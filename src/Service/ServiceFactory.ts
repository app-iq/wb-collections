import { CollectionsDefaults } from './../Defaults/DefaultsContext';
import { BasicFetchService, BasicFetchOptions } from './Fetch/OptionBasedFetchService';
import { HttpFetchService, HttpFetchOptions } from './Fetch/HttpFetchService';
import { DispatchFunction } from 'wbox-context/dist/Context/DispatchContext';
import { State } from './../Data/State';
import { FetchService } from './Fetch/FetchService';
export interface ServiceFactory {
    createHttpFetchService(): FetchService;
    createOptionBasedFetchService(): FetchService;
}

export class DefaultServiceFactory implements ServiceFactory {
    private readonly state: State;
    private readonly dispatch: DispatchFunction;
    private readonly defaults: CollectionsDefaults;

    public constructor(state: State, dispatch: DispatchFunction, defaults: CollectionsDefaults) {
        this.state = state;
        this.dispatch = dispatch;
        this.defaults = defaults;
    }

    createOptionBasedFetchService(): FetchService {
        return new BasicFetchService(this.dispatch, this.state.options.fetch as BasicFetchOptions);
    }

    createHttpFetchService(): FetchService {
        return new HttpFetchService(this.dispatch, this.state.options.fetch as HttpFetchOptions, this.defaults);
    }
}
