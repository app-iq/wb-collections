import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { Action, CoreProvider, DispatchFunction, Reducer } from 'wb-core-provider';
import { fetchReducer } from '../Data/Fetch/FetchReducer';
import { fieldsReducer } from '../Data/Fields/FieldsReducer';
import { modificationReducer } from '../Data/Modification/ModificationReducer';
import { paginationReducer } from '../Data/Pagination/PaginationReducer';
import { buildInitialState, State } from '../Data/State';
import { Field } from '../Field/Field';
import { BasicFetchOptions } from '../Service/Fetch/BasicFetchService';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { DefaultServiceFactory, ServiceFactory } from '../Service/ServiceFactory';
import { CollectionWrapper } from './CollectionWrapper';

export interface CollectionProviderProps {
    reducers?: Reducer<State, Action<unknown, unknown>>[];
    serviceFactory?: (dispatch: DispatchFunction, state: State, props: CollectionProviderProps) => ServiceFactory;
    fetchOptions: BasicFetchOptions | HttpFetchOptions;
    fields: Field[];
    pageSize?: number;
}

const baseReducers = [fetchReducer, fieldsReducer, paginationReducer, modificationReducer];

export function CollectionProvider(props: PropsWithChildren<CollectionProviderProps>) {
    const { children, reducers, serviceFactory, fetchOptions, pageSize, fields } = props;
    const fetcherType = (fetchOptions as BasicFetchOptions).data !== undefined ? 'direct' : 'http';
    const allReducers = useMemo(() => baseReducers.concat(reducers ?? []), [reducers]);
    const createServiceFactory = useCallback(
        (dispatch: DispatchFunction, state: unknown) =>
            serviceFactory
                ? serviceFactory(dispatch, state as State, props)
                : new DefaultServiceFactory(state as State, dispatch, props),
        [props, serviceFactory]
    );
    const initialState = useMemo(
        () => buildInitialState({ pageSize, fields, visibleFields: fields.map(f => f.name) }),
        [fields, pageSize]
    );
    return (
        <CoreProvider reducers={allReducers} createServiceFactory={createServiceFactory} initialState={initialState}>
            <CollectionWrapper fetcherType={fetcherType} fetchOptions={fetchOptions}>
                {children}
            </CollectionWrapper>
        </CoreProvider>
    );
}
