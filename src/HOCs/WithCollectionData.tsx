import React from 'react';
import {useCollectionData} from '../Hooks/UseCollectionData';

export interface WithCollectionDataProps {
    items: unknown[];
    page: number;
    totalCount: number;
}

export function withCollectionData<TProps = Record<string, unknown>>(Component: React.ComponentType<TProps & WithCollectionDataProps>) {
    return function WithCollectionDataWrapper(props: TProps) {
        const [items, totalCount, page] = useCollectionData();
        return <Component {...props} items={items} page={page} totalCount={totalCount}/>;
    };
}
