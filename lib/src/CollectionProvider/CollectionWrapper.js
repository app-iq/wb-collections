import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useDispatch, useServiceFactory } from 'wb-core-provider';
import { FieldsActions } from '../Data/Fields/FieldsActions';
export const CollectionWrapper = props => {
    const dispatch = useDispatch();
    const serviceFactory = useServiceFactory();
    useEffect(() => {
        dispatch(FieldsActions.set(props.fields));
    }, [dispatch, props.fetchOptions]);
    useEffect(() => {
        const service = props.fetcherType === 'http'
            ? serviceFactory.createHttpFetchService()
            : serviceFactory.createBasicFetchService();
        service.fetch();
    }, [dispatch, props.fetchOptions]);
    return _jsx(_Fragment, { children: props.children });
};
