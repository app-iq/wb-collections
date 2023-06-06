import { DefaultsContext } from './DefaultsContext';
import { useContext } from 'react';

export function useCollectionDefaults() {
    const defaults = useContext(DefaultsContext);
    return defaults;
}
