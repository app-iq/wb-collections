import { OptionBasedFetchService } from './Fetch/OptionBasedFetchService';
import { HttpFetchService, HttpFetchOptions } from './Fetch/HttpFetchService';
import { DispatchFunction } from 'wbox-context/dist/Context/DispatchContext';
import { State } from './../Data/State';
import { FetchService } from './Fetch/FetchService';
export interface ServiceFactory {
    createHttpFetchService(state: State, dispatch: DispatchFunction , options: HttpFetchOptions): FetchService;
    createOptionBasedFetchService(state: State, dispatch: DispatchFunction): FetchService;
}

export class DefaultServiceFactory implements ServiceFactory {
    createOptionBasedFetchService(state: State, dispatch: DispatchFunction): FetchService {
        return new OptionBasedFetchService(dispatch, { data: [] });
    }

    createHttpFetchService(state: State, dispatch: DispatchFunction , options: HttpFetchOptions): FetchService {
        return new HttpFetchService(dispatch, options);
    }
}
