import React from 'react';
import { DataResult } from './../Service/Fetch/FetchServiceBase';

export interface CollectionsDefaults {
    httpFetcher: {
        method: string;
        parseResponse: (response: Response) => Promise<unknown>;
        buildDataResult: (parsedResponse: unknown) => DataResult;
        headers: HeadersInit;
        requestOptions: Partial<RequestInit>;
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
    },
};

export const DefaultsContext = React.createContext<CollectionsDefaults>(defaults);
