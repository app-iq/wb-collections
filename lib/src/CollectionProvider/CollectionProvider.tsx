import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { Action, CoreProvider, DispatchFunction, Reducer } from 'wb-core-provider';
import { fetchReducer as fetchReducer } from '../Data/Fetch/FetchReducer';
import { fieldsReducer } from '../Data/Fields/FieldsReducer';
import { modificationReducer } from '../Data/Modification/ModificationReducer';
import { paginationReducer } from '../Data/Pagination/PaginationReducer';
import { buildInitialState, State } from '../Data/State';
import { RenderOptions } from '../Data/Types/Elements';
import { useCollectionDefaults } from '../Defaults/Hooks';
import { Field } from '../Field/Field';
import { BasicFetchOptions } from '../Service/Fetch/BasicFetchService';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { DefaultServiceFactory, ServiceFactory } from '../Service/ServiceFactory';
import { CollectionWrapper } from './CollectionWrapper';

export interface CollectionProviderProps {
    reducers?: Reducer<State, Action<unknown, unknown>>[];
    serviceFactory?: (dispatch: DispatchFunction, state: State, props: CollectionProviderProps) => ServiceFactory;
    fetchOptions: BasicFetchOptions | HttpFetchOptions;
    renderOptions?: RenderOptions;
    fields: Field[];
    pageSize?: number;
}

const baseReducers = [fetchReducer, fieldsReducer, paginationReducer, modificationReducer];

export const CollectionProvider: React.FC<PropsWithChildren<CollectionProviderProps>> = props => {
    const fetcherType = props.fetchOptions.data !== undefined ? 'direct' : 'http';
    const reducers = useMemo(() => baseReducers.concat(props.reducers ?? []), [props.reducers]);
    const createServiceFactory = useCallback(
        (dispatch: DispatchFunction, state: unknown) =>
            props.serviceFactory
                ? props.serviceFactory(dispatch, state as State, props)
                : new DefaultServiceFactory(state as State, dispatch, defaults, props),
        [props.serviceFactory]
    );
    const defaults = useCollectionDefaults();
    const initialState = useMemo(() => buildInitialState({ pageSize: props.pageSize }), [props.pageSize]);
    return (
        <CoreProvider reducers={reducers} createServiceFactory={createServiceFactory} initialState={initialState}>
            <CollectionWrapper fetcherType={fetcherType} fields={props.fields} fetchOptions={props.fetchOptions}>
                {props.children}
            </CollectionWrapper>
        </CoreProvider>
    );
};
