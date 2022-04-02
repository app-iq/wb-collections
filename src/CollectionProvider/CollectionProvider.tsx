import React, { useEffect, useMemo } from 'react';
import {
    Action,
    CoreProvider,
    DispatchFunction,
    Reducer,
    useDispatch,
    useServiceFactory,
    useState,
} from 'wbox-context';
import { FetchReducer as fetchReducer } from '../Data/Fetch/FetchReducer';
import { FieldsActions } from '../Data/Fields/FieldsActions';
import { fieldsReducer } from '../Data/Fields/FieldsReducer';
import { OptionsActions } from '../Data/Options/OptionsActions';
import { optionsReducer } from '../Data/Options/OptionsReducer';
import { buildInitialState, INITIAL_STATE, State } from '../Data/State';
import { RenderOptions } from '../Data/Types/OptionsState';
import { useCollectionDefaults } from '../Defaults/Hooks';
import { Field } from '../Field/Field';
import { FetchService } from '../Service/Fetch/FetchService';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { BasicFetchOptions } from '../Service/Fetch/BasicFetchService';
import { DefaultServiceFactory, ServiceFactory } from '../Service/ServiceFactory';

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
    const fetcherType: FetcherType = props.fetchOptions.data !== undefined ? 'direct' : 'http';
    const reducers = baseReducers.concat(props.reducers ?? []);
    const defaults = useCollectionDefaults();
    const initialState = useMemo(() => buildInitialState({options: {render: props.renderOptions ?? {} , fetch: props.fetchOptions}}) , []);
    return (
        <CoreProvider
            //todo : use memo
            reducers={reducers}
            //todo : use callback
            createServiceFactory={(dispatch, state) =>
                props.serviceFactory
                    ? props.serviceFactory(dispatch, state as State)
                    : new DefaultServiceFactory(state as State, dispatch, defaults)
            }
            initialState={initialState}
        >
            <CollectionWrapper fetcherType={fetcherType} fields={props.fields} fetchOptions={props.fetchOptions}>
                {props.children}
            </CollectionWrapper>
        </CoreProvider>
    );
};

type FetcherType = 'http' | 'direct';
interface CollectionWrapperProps {
    fetcherType: FetcherType;
    fetchOptions: BasicFetchOptions | HttpFetchOptions;
    fields: Field[];
}

export const CollectionWrapper: React.FC<CollectionWrapperProps> = props => {
    const dispatch = useDispatch();
    const sf: ServiceFactory = useServiceFactory();

    useEffect(() => {
        dispatch(OptionsActions.setFetchOptions(props.fetchOptions))
        dispatch(FieldsActions.set(props.fields));
    }, [dispatch, props.fetchOptions]);

    useEffect(() => {
        const service: FetchService =
            props.fetcherType === 'http'
                ? sf.createHttpFetchService()
                : sf.createOptionBasedFetchService();
        service.fetch();
    }, [props.fetchOptions]);

    return <div>{props.children}</div>;
};
