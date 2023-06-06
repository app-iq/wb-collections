import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useServiceFactory } from 'wb-core-provider';
import { FieldsActions } from '../Data/Fields/FieldsActions';
import { Field } from '../Field/Field';
import { BasicFetchOptions } from '../Service/Fetch/BasicFetchService';
import { FetchService } from '../Service/Fetch/FetchService';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { ServiceFactory } from '../Service/ServiceFactory';

type FetcherType = 'http' | 'direct';

interface CollectionWrapperProps {
    fetcherType: FetcherType;
    fetchOptions: BasicFetchOptions | HttpFetchOptions;
    fields: Field[];
}

export const CollectionWrapper: React.FC<PropsWithChildren<CollectionWrapperProps>> = props => {
    const dispatch = useDispatch();
    const serviceFactory: ServiceFactory = useServiceFactory();

    useEffect(() => {
        dispatch(FieldsActions.set(props.fields));
    }, [dispatch, props.fetchOptions]);

    useEffect(() => {
        const service: FetchService =
            props.fetcherType === 'http'
                ? serviceFactory.createHttpFetchService()
                : serviceFactory.createBasicFetchService();
        service.fetch();
    }, [dispatch, props.fetchOptions]);

    return <>{props.children}</>;
};
