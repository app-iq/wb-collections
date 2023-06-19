import { useContext } from 'react';
import { CollectionConfigurationContext } from '../CollectionProvider/CollectionConfigurationContext';

export function useCollectionConfiguration() {
    return useContext(CollectionConfigurationContext);
}
