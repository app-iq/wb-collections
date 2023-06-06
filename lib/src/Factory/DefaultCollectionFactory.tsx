import React, { ReactElement } from 'react';
import { InfiniteScroll } from '../Collection/InfiniteScroll';
import { CollectionProvider } from '../CollectionProvider/CollectionProvider';
import { CollectionFactory } from './CollectionFactory';
import { DefaultFactoryConfiguration } from './DefaultFactoryConfiguration';
import { Table } from './TableCollection';

export class DefaultCollectionFactory implements CollectionFactory<DefaultFactoryConfiguration> {
    create(configuration: DefaultFactoryConfiguration): ReactElement {
        const Wrapper = configuration.infiniteScroll ? React.Fragment : InfiniteScroll;
        const props = configuration.infiniteScroll ? { target: configuration.infiniteScrollTarget } : {};
        return (
            <CollectionProvider {...configuration.providerOptions}>
                <Wrapper {...props}>
                    <Table />
                </Wrapper>
            </CollectionProvider>
        );
    }
}
