import { ReactElement } from 'react';

export interface OptionsState {
    render: RenderOptions;
}

export interface Elements {
    loading: (() => ReactElement | null) | null;
    error: (() => ReactElement | null) | null;
    empty: (() => ReactElement | null) | null;
    collection: (() => ReactElement | null) | null;
}

export interface RenderOptions {
    renderLoading?: (() => ReactElement | null) | null;
    renderError?: (() => ReactElement | null) | null;
    renderEmpty?: (() => ReactElement | null) | null;
    orderElements?: (elements: Elements) => ((() => ReactElement | null) | null)[];
    displayCollectionOnEmpty?: boolean;
}
