import { useEffect } from 'react';
import { useDispatch, useServiceFactory } from 'wbox-context';
import { FieldsActions } from '../Data/Fields/FieldsActions';
import { Field } from '../Field/Field';
import { BasicFetchOptions } from '../Service/Fetch/BasicFetchService';
import { FetchService } from '../Service/Fetch/FetchService';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { ServiceFactory } from '../Service/ServiceFactory';
import React from 'react';

type FetcherType = 'http' | 'direct';
interface CollectionWrapperProps {
    fetcherType: FetcherType;
    fetchOptions: BasicFetchOptions | HttpFetchOptions;
    fields: Field[];
}

export const CollectionWrapper: React.FC<CollectionWrapperProps> = props => {
    const dispatch = useDispatch();
    const serviceFactory: ServiceFactory = useServiceFactory();

    useEffect(() => {
        dispatch(FieldsActions.set(props.fields));
    }, [dispatch, props.fetchOptions]);

    useEffect(() => {
        const service: FetchService =
            props.fetcherType === 'http' ? serviceFactory.createHttpFetchService() : serviceFactory.createBasicFetchService();
        service.fetch();
    }, [props.fetchOptions]);

    return <div>{props.children}</div>;
};
