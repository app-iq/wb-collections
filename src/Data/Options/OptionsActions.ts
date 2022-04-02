import { RenderOptions } from './../Types/OptionsState';
import { Action } from 'wbox-context';
import { FetchOptions } from '../State';

export enum OptionsActionType {
    SET_RENDER_OPTIONS = 'OPTIONS_ACTION@SET_RENDER_OPTIONS',
    SET_FETCH_OPTIONS = 'OPTIONS_ACTION@SET_FETCH_OPTIONS',
}

export type OptionsAction<TPayload> = Action<OptionsActionType, TPayload>;

export class OptionsActions {
    public static setRenderOptions(options: RenderOptions): OptionsAction<RenderOptions> {
        return {
            type: OptionsActionType.SET_RENDER_OPTIONS,
            payload: options,
        };
    }

    public static setFetchOptions(options: FetchOptions): OptionsAction<FetchOptions> {
        return {
            type: OptionsActionType.SET_FETCH_OPTIONS,
            payload: options,
        };
    }
}

