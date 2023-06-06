import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import { CoreProvider } from 'wb-core-provider';
import { fetchReducer as fetchReducer } from '../Data/Fetch/FetchReducer';
import { fieldsReducer } from '../Data/Fields/FieldsReducer';
import { modificationReducer } from '../Data/Modification/ModificationReducer';
import { paginationReducer } from '../Data/Pagination/PaginationReducer';
import { buildInitialState } from '../Data/State';
import { useCollectionDefaults } from '../Defaults/Hooks';
import { DefaultServiceFactory } from '../Service/ServiceFactory';
import { CollectionWrapper } from './CollectionWrapper';
const baseReducers = [fetchReducer, fieldsReducer, paginationReducer, modificationReducer];
export const CollectionProvider = props => {
    const fetcherType = props.fetchOptions.data !== undefined ? 'direct' : 'http';
    const reducers = useMemo(() => baseReducers.concat(props.reducers ?? []), [props.reducers]);
    const createServiceFactory = useCallback((dispatch, state) => props.serviceFactory
        ? props.serviceFactory(dispatch, state, props)
        : new DefaultServiceFactory(state, dispatch, defaults, props), [props.serviceFactory]);
    const defaults = useCollectionDefaults();
    const initialState = useMemo(() => buildInitialState({ pageSize: props.pageSize }), [props.pageSize]);
    return (_jsx(CoreProvider, { reducers: reducers, createServiceFactory: createServiceFactory, initialState: initialState, children: _jsx(CollectionWrapper, { fetcherType: fetcherType, fields: props.fields, fetchOptions: props.fetchOptions, children: props.children }) }));
};
