import React, { ReactElement, useEffect } from 'react';
import {
    Action,
    CoreProvider,
    DispatchFunction,
    Reducer,
    useDispatch,
    useServiceFactory,
    useState,
} from 'wbox-context';
import { FetchReducer as fetchReducer } from '../Data/Fetch/FetchReducer';
import { INITIAL_STATE, State } from '../Data/State';
import { RenderOptions } from '../Data/Types/OptionsState';
import { FetchService } from '../Service/Fetch/FetchService';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { DirectFetchOptions } from '../Service/Fetch/OptionBasedFetchService';
import { DefaultServiceFactory, ServiceFactory } from '../Service/ServiceFactory';

export interface CollectionProviderProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reducers?: Reducer<State, Action<any, any>>[];
    serviceFactory?: (dispatch: DispatchFunction, state: State) => ServiceFactory;
    data: DirectFetchOptions | HttpFetchOptions;
    render?: RenderOptions;
}

const baseReducers = [fetchReducer];

export const CollectionProvider: React.FC<CollectionProviderProps> = props => {
    const fetcherType: FetcherType = props.data !== undefined ? 'direct' : 'http';
    const reducers = baseReducers.concat(props.reducers ?? []);
    return (
        <CoreProvider
            reducers={reducers}
            createServiceFactory={(dispatch, state) =>
                props.serviceFactory ? props.serviceFactory(dispatch, state as State) : new DefaultServiceFactory()
            }
            initialState={INITIAL_STATE}
        >
            <CollectionWrapper fetcherType={fetcherType}>{props.children}</CollectionWrapper>
        </CoreProvider>
    );
};

type FetcherType = 'http' | 'direct';
interface CollectionWrapperProps {
    fetcherType: FetcherType;
}

export const CollectionWrapper: React.FC<CollectionWrapperProps> = props => {
    const dispatch = useDispatch();
    const state: State = useState();
    const sf: ServiceFactory = useServiceFactory();

    useEffect(() => {
        const service: FetchService =
            props.fetcherType === 'http'
                ? sf.createOptionBasedFetchService(state, dispatch)
                : sf.createOptionBasedFetchService(state, dispatch);
        service.fetch();
    }, []);

    return <div>{props.children}</div>;
};
