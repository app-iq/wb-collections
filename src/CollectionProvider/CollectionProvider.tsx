import React, { useCallback, useMemo } from 'react';
import { Action, CoreProvider, DispatchFunction, Reducer } from 'wbox-context';
import { FetchReducer as fetchReducer } from '../Data/Fetch/FetchReducer';
import { fieldsReducer } from '../Data/Fields/FieldsReducer';
import { optionsReducer } from '../Data/Options/OptionsReducer';
import { buildInitialState, State } from '../Data/State';
import { RenderOptions } from '../Data/Types/OptionsState';
import { useCollectionDefaults } from '../Defaults/Hooks';
import { Field } from '../Field/Field';
import { BasicFetchOptions } from '../Service/Fetch/BasicFetchService';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { DefaultServiceFactory, ServiceFactory } from '../Service/ServiceFactory';
import { CollectionWrapper } from './CollectionWrapper';

export interface CollectionProviderProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reducers?: Reducer<State, Action<any, any>>[];
    serviceFactory?: (dispatch: DispatchFunction, state: State) => ServiceFactory;
    fetchOptions: BasicFetchOptions | HttpFetchOptions;
    renderOptions?: RenderOptions;
    fields: Field[];
}

const baseReducers = [fieldsReducer, fetchReducer, optionsReducer];

export const CollectionProvider: React.FC<CollectionProviderProps> = props => {
    const fetcherType = props.fetchOptions.data !== undefined ? 'direct' : 'http';
    const reducers = useMemo(() => baseReducers.concat(props.reducers ?? []), [props.reducers]);
    const createServiceFactory = useCallback(
        (dispatch, state) =>
            props.serviceFactory
                ? props.serviceFactory(dispatch, state as State)
                : new DefaultServiceFactory(state as State, dispatch, defaults),
        [props.serviceFactory],
    );
    const defaults = useCollectionDefaults();
    const initialState = useMemo(
        () => buildInitialState({ options: { render: props.renderOptions ?? {}, fetch: props.fetchOptions } }),
        [],
    );
    return (
        <CoreProvider reducers={reducers} createServiceFactory={createServiceFactory} initialState={initialState}>
            <CollectionWrapper fetcherType={fetcherType} fields={props.fields} fetchOptions={props.fetchOptions}>
                {props.children}
            </CollectionWrapper>
        </CoreProvider>
    );
};

