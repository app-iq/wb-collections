import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const defaultOrderElements = (elements) => {
    return [elements.loading, elements.error, elements.empty, elements.collection];
};
export const defaults = {
    httpFetcher: {
        method: 'GET',
        parseResponse: (response) => response.json(),
        buildDataResult: (parsedResponse) => {
            const res = parsedResponse;
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
        renderEmpty: () => _jsx("h1", { children: "Empty" }),
        renderLoading: () => _jsx("h1", { children: "Loading..." }),
        renderError: () => _jsx("h1", { children: "Error" }),
        displayCollectionOnEmpty: false,
        orderElements: defaultOrderElements,
        infinityScrollThreshold: 10,
    },
};
export const DefaultsContext = React.createContext(defaults);
