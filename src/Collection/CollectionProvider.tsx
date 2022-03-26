import React from 'react';
import { CoreProvider, CoreProviderProps, Reducer } from 'wbox-context';

export interface CollectionProviderProps {
    //TODO : ADD REDUCERS PROP
}

export const CollectionProvider: React.FC<CollectionProviderProps> = props => {
    return (
        <CoreProvider reducers={[]} createServiceFactory={() => null} initialState={{}}>
            {props.children}
        </CoreProvider>
    );
};
