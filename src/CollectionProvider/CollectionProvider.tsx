import React, { useEffect } from 'react';
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
import { INITIAL_STATE, State } from '../Data/State';
import { RenderOptions } from '../Data/Types/OptionsState';
import { Field } from '../Field/Field';
import { FetchService } from '../Service/Fetch/FetchService';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { SimpleFetchOptions } from '../Service/Fetch/OptionBasedFetchService';
import { DefaultServiceFactory, ServiceFactory } from '../Service/ServiceFactory';

export interface CollectionProviderProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reducers?: Reducer<State, Action<any, any>>[];
    serviceFactory?: (dispatch: DispatchFunction, state: State) => ServiceFactory;
    dataOptions: SimpleFetchOptions | HttpFetchOptions;
    renderOptions?: RenderOptions;
    fields: Field[];
}

const baseReducers = [fieldsReducer, fetchReducer];

export const CollectionProvider: React.FC<CollectionProviderProps> = props => {
    const fetcherType: FetcherType = props.dataOptions.data !== undefined ? 'direct' : 'http';
    const reducers = baseReducers.concat(props.reducers ?? []);
    return (
        <CoreProvider
            reducers={reducers}
            createServiceFactory={(dispatch, state) =>
                props.serviceFactory ? props.serviceFactory(dispatch, state as State) : new DefaultServiceFactory()
            }
            initialState={INITIAL_STATE}
        >
            <CollectionWrapper fetcherType={fetcherType} fields={props.fields} fetchOptions={props.dataOptions}>
                {props.children}
            </CollectionWrapper>
        </CoreProvider>
    );
};

type FetcherType = 'http' | 'direct';
interface CollectionWrapperProps {
    fetcherType: FetcherType;
    fetchOptions: SimpleFetchOptions | HttpFetchOptions;
    fields: Field[];
}

export const CollectionWrapper: React.FC<CollectionWrapperProps> = props => {
    const dispatch = useDispatch();
    const state: State = useState();
    const sf: ServiceFactory = useServiceFactory();

    useEffect(() => {
        dispatch(FieldsActions.set(props.fields));
    }, [dispatch, props.fields]);

    useEffect(() => {
        const service: FetchService =
            props.fetcherType === 'http'
                ? sf.createHttpFetchService(state, dispatch, props.fetchOptions as HttpFetchOptions)
                : sf.createOptionBasedFetchService(state, dispatch);
        service.fetch();
    }, []);

    return <div>{props.children}</div>;
};
