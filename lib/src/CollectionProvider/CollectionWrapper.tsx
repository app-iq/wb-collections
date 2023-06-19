import { PropsWithChildren, useEffect } from 'react';
import { useServiceFactory } from 'wb-core-provider';
import { BasicFetchOptions } from '../Service/Fetch/BasicFetchService';
import { FetchService } from '../Service/Fetch/FetchService';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { ServiceFactory } from '../Service/ServiceFactory';

interface CollectionWrapperProps {
    fetchOptions: BasicFetchOptions | HttpFetchOptions;
}

export function CollectionWrapper({ fetchOptions, children }: PropsWithChildren<CollectionWrapperProps>) {
    const fetcherType = (fetchOptions as BasicFetchOptions).data !== undefined ? 'direct' : 'http';

    const serviceFactory: ServiceFactory = useServiceFactory();

    useEffect(() => {
        const service: FetchService =
            fetcherType === 'http' ? serviceFactory.createHttpFetchService() : serviceFactory.createBasicFetchService();
        service.fetch();
        // serviceFactory SHOULD NOT be in the dependency array, because it will cause an infinite loop
        // service factory will be created every time the state changed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetcherType, fetchOptions]);

    return children;
}
