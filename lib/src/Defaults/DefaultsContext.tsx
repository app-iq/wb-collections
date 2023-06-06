import React, { ReactElement } from 'react';
import { Elements } from '../Data/Types/Elements';
import { FetchPageOptionCallback } from '../Service/Fetch/HttpFetchService';
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
        fetchPageOptions: FetchPageOptionCallback;
    };
    renderOptions: {
        renderLoading: () => ReactElement | null;
        renderError: () => ReactElement | null;
        renderEmpty: () => ReactElement | null;
        displayCollectionOnEmpty: boolean;
        orderElements: (elements: Elements) => ((() => ReactElement | null) | null)[];
        infinityScrollThreshold: number;
    };
}

export const defaults: CollectionsDefaults = {
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
        fetchPageOptions: (url, options, _totalCount, _items, page) => {
            const urlObj = new URL(url);
            urlObj.searchParams.set('page', String(page));
            return {
                url: urlObj.toString(),
                options: options,
            };
        },
    },
    renderOptions: {
        renderEmpty: () => <h1>Empty</h1>,
        renderLoading: () => <h1>Loading...</h1>,
        renderError: () => <h1>Error</h1>,
        displayCollectionOnEmpty: false,
        orderElements: defaultOrderElements,
        infinityScrollThreshold: 10,
    },
};

export const DefaultsContext = React.createContext<CollectionsDefaults>(defaults);
