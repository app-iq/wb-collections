import {DefaultsContext} from './DefaultsContext';
import {useContext} from 'react';

export function useCollectionDefaults() {
    return useContext(DefaultsContext);
}
