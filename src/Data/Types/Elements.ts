import { ReactElement } from 'react';

export type Element = (() => ReactElement | null) | null;

export interface Elements {
    loading: Element;
    error: Element;
    empty: Element;
    collection: Element;
}

export interface RenderOptions {
    renderLoading?: Element;
    renderError?: Element;
    renderEmpty?: Element;
    orderElements?: (elements: Elements) => Element[];
    displayCollectionOnEmpty?: boolean;
}
