import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { InfiniteScroll } from '../Collection/InfiniteScroll';
import { CollectionProvider } from '../CollectionProvider/CollectionProvider';
import { Table } from './TableCollection';
export class DefaultCollectionFactory {
    create(configuration) {
        const Wrapper = configuration.infiniteScroll ? React.Fragment : InfiniteScroll;
        const props = configuration.infiniteScroll ? { target: configuration.infiniteScrollTarget } : {};
        return (_jsx(CollectionProvider, { ...configuration.providerOptions, children: _jsx(Wrapper, { ...props, children: _jsx(Table, {}) }) }));
    }
}
