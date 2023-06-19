import React from 'react';
import { Field } from '../Field/Field';

export interface CollectionConfiguration {
    pageSize?: number;
    fields: Field[];
}

export const CollectionConfigurationContext = React.createContext<CollectionConfiguration>({
    fields: [],
});

export const CollectionConfigurationProvider = CollectionConfigurationContext.Provider;
