import React, { ReactElement } from 'react';
import { Elements } from '../Data/Types/OptionsState';
import { NextPageOptionCallback } from '../Service/Fetch/HttpFetchService';
import { DataResult } from './../Service/Fetch/FetchServiceBase';

const defaultOrderElements = (elements: Elements) => {
    return [elements.loading, elements.error, elements.empty, elements.collection];
};
export interface CollectionsDefaults {
    httpFetcher: {
        method: string;
        parseResponse: (response: Response) => Promise<unknown>;
        buildDataResult: (parsedResponse: unknown) => DataResult;
        headers: HeadersInit;
        requestOptions: Partial<RequestInit>;
        nextPageOptions: NextPageOptionCallback;
    };
    renderOptions: {
        renderLoading: () => ReactElement | null;
        renderError: () => ReactElement | null;
        renderEmpty: () => ReactElement | null;
        displayCollectionOnEmpty: boolean;
        orderElements: (elements: Elements) => ((() => ReactElement | null) | null)[];
    };
}

const defaults: CollectionsDefaults = {
    httpFetcher: {
        method: 'GET',
        parseResponse: (response: Response) => response.json(),
        buildDataResult: (parsedResponse: unknown) => {
            const res = parsedResponse as unknown[];
            return { totalCount: res.length, items: res };
        },
        headers: {
            'Content-Type': 'application/json',
        },
        requestOptions: {},
        nextPageOptions: () => {
            // this default option is defined just in case there will be one callback that handle building "fetch more" options for many use case
            throw Error('no default implementation for nextPageOptions');
        },
    },
    renderOptions: {
        renderEmpty: () => <h1>Empty</h1>,
        renderLoading: () => <h1>Loading</h1>,
        renderError: () => <h1>Error</h1>,
        displayCollectionOnEmpty: false,
        orderElements: defaultOrderElements,
    },
};

export const DefaultsContext = React.createContext<CollectionsDefaults>(defaults);
