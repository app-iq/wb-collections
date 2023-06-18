import { useState } from 'wb-core-provider';
import { State } from '../Data/State';

export const useVisibleFields = () => {
    const state = useState<State>();
    const allFields = state.fields;
    const { visibleFields } = state;
    return allFields.filter(f => visibleFields.includes(f.name));
};
