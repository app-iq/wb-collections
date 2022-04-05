import { RenderOptions } from '../Types/Elements';
import { Reducer } from 'wbox-context';
import { FetchOptions, State } from '../State';
import { OptionsAction, OptionsActionType } from './OptionsActions';

export const optionsReducer: Reducer<State, OptionsAction<unknown>> = (state, action) => {
    switch (action.type) {
        case OptionsActionType.SET_RENDER_OPTIONS:
            return { ...state, options: { ...state.options, render: action.payload as RenderOptions } };
        case OptionsActionType.SET_FETCH_OPTIONS:
            return { ...state, options: { ...state.options, fetch: action.payload as FetchOptions } };
    }
    return state;
};
