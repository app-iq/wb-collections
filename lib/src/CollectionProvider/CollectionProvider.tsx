import { PropsWithChildren, useCallback, useMemo } from 'react';
import { Action, WBProvider, DispatchFunction, Reducer } from 'wb-provider';
import { fetchReducer } from '../Data/Fetch/FetchReducer';
import { modificationReducer } from '../Data/Modification/ModificationReducer';
import { paginationReducer } from '../Data/Pagination/PaginationReducer';
import { initialState, State } from '../Data/State';
import { Field } from '../Field/Field';
import { BasicFetchOptions } from '../Service/Fetch/BasicFetchService';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { DefaultServiceFactory, ServiceFactory } from '../Service/ServiceFactory';
import { CollectionWrapper } from './CollectionWrapper';
import { CollectionConfigurationProvider } from './CollectionConfigurationContext';

export interface CollectionProviderProps {
    reducers?: Reducer<State, Action<unknown, unknown>>[];
    serviceFactory?: (dispatch: DispatchFunction, state: State, props: CollectionProviderProps) => ServiceFactory;
    fetchOptions: BasicFetchOptions | HttpFetchOptions;
    fields: Field[];
    pageSize?: number;
}

const baseReducers = [fetchReducer, paginationReducer, modificationReducer];

export function CollectionProvider(props: PropsWithChildren<CollectionProviderProps>) {
    const { children, reducers, serviceFactory, fetchOptions, pageSize, fields } = props;
    const allReducers = useMemo(() => baseReducers.concat(reducers ?? []), [reducers]);
    const createServiceFactory = useCallback(
        (dispatch: DispatchFunction, state: unknown) =>
            serviceFactory
                ? serviceFactory(dispatch, state as State, props)
                : new DefaultServiceFactory(state as State, dispatch, props),
        [props, serviceFactory]
    );

    return (
        <WBProvider reducers={allReducers} createServiceFactory={createServiceFactory} initialState={initialState}>
            <CollectionConfigurationProvider
                value={{
                    pageSize,
                    fields,
                }}
            >
                <CollectionWrapper fetchOptions={fetchOptions}>{children}</CollectionWrapper>
            </CollectionConfigurationProvider>
        </WBProvider>
    );
}
