import React, { useEffect } from 'react';
import { CoreProvider, DispatchFunction, useDispatch, useServiceFactory, useState } from 'wbox-context';
import { INITIAL_STATE, State } from '../Data/State';
import { FetchService } from '../Service/Fetch/FetchService';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { DirectFetchOptions } from '../Service/Fetch/OptionBasedFetchService';
import { DefaultServiceFactory, ServiceFactory } from '../Service/ServiceFactory';

export interface CollectionProviderProps {
    // TODO : ADD REDUCERS PROP
    serviceFactory?: (dispatch: DispatchFunction, state: State) => ServiceFactory;
    data: DirectFetchOptions | HttpFetchOptions;
}

export const CollectionProvider: React.FC<CollectionProviderProps> = props => {
    const fetcherType: FetcherType = props.data !== undefined ? 'direct' : 'http';

    return (
        <CoreProvider
            reducers={[]}
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
