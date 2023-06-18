import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useServiceFactory } from 'wb-core-provider';
import { BasicFetchOptions } from '../Service/Fetch/BasicFetchService';
import { FetchService } from '../Service/Fetch/FetchService';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { ServiceFactory } from '../Service/ServiceFactory';

type FetcherType = 'http' | 'direct';

interface CollectionWrapperProps {
    fetcherType: FetcherType;
    fetchOptions: BasicFetchOptions | HttpFetchOptions;
}

export function CollectionWrapper({ fetcherType, fetchOptions, children }: PropsWithChildren<CollectionWrapperProps>) {
    const dispatch = useDispatch();
    const serviceFactory: ServiceFactory = useServiceFactory();

    useEffect(() => {
        const service: FetchService =
            fetcherType === 'http' ? serviceFactory.createHttpFetchService() : serviceFactory.createBasicFetchService();
        service.fetch();
    }, [dispatch, fetcherType, fetchOptions, serviceFactory]);

    return children;
}
