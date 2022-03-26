import React, { useEffect } from 'react';
import { CoreProvider, DispatchFunction, useDispatch, useServiceFactory, useState } from 'wbox-context';
import { State } from '../Data/State';
import { DefaultServiceFactory, ServiceFactory } from '../Service/ServiceFactory';

export interface CollectionProviderProps {
    //TODO : ADD REDUCERS PROP
    serviceFactory?: (dispatch: DispatchFunction, state: State) => ServiceFactory;
}

export const CollectionProvider: React.FC<CollectionProviderProps> = props => {
    return (
        <CoreProvider
            reducers={[]}
            createServiceFactory={(dispatch, state) =>
                props.serviceFactory ? props.serviceFactory(dispatch, state as State) : new DefaultServiceFactory()
            }
            initialState={{}}
        >
            <CollectionWrapper>
                {props.children}
            </CollectionWrapper>
        </CoreProvider>
    );
};

export const CollectionWrapper: React.FC = (props) => {
    const dispatch = useDispatch();
    const state : State = useState();
    const sf : ServiceFactory = useServiceFactory();

    useEffect(() => {
        // TODO: fetch data
        const service = sf.createOptionBasedFetchService(state , dispatch);
        service.fetch();
    }, []);
    return <div>
        {
            props.children
        }
    </div>
}