import {CollectionsDefaults} from './../Defaults/DefaultsContext';
import {BasicFetchOptions, BasicFetchService} from './Fetch/BasicFetchService';
import {HttpFetchOptions, HttpFetchService} from './Fetch/HttpFetchService';
import {DispatchFunction} from 'wb-core-provider';
import {State} from './../Data/State';
import {FetchService} from './Fetch/FetchService';
import {CollectionProviderProps} from '../CollectionProvider/CollectionProvider';

export interface ServiceFactory {
    createHttpFetchService(): FetchService;
    createBasicFetchService(): FetchService;
}

export class DefaultServiceFactory implements ServiceFactory {
    private readonly state: State;
    private readonly dispatch: DispatchFunction;
    private readonly defaults: CollectionsDefaults;
    private readonly props : CollectionProviderProps;

    public constructor(state: State, dispatch: DispatchFunction, defaults: CollectionsDefaults , props : CollectionProviderProps) {
        this.state = state;
        this.dispatch = dispatch;
        this.defaults = defaults;
        this.props = props;
    }

    createBasicFetchService(): FetchService {
        return new BasicFetchService(this.dispatch, this.props.fetchOptions as BasicFetchOptions);
    }

    createHttpFetchService(): FetchService {
        return new HttpFetchService(this.dispatch, this.state, this.props.fetchOptions as HttpFetchOptions, this.defaults);
    }
}
