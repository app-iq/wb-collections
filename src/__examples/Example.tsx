import React from 'react';
import { CollectionProvider } from '../CollectionProvider/CollectionProvider';
import { Field } from '../Field/Field';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { Table } from './TableCollection';

export function Example() {
    const dataOptions: HttpFetchOptions = {
        url: 'http://localhost:8080/collection',
        buildData: (res: any) => ({ items: res.data, totalCount: res.data.length }),
    };
    const fields: Field[] = [
        { name: 'id', title: '#' },
        { name: 'name', title: 'Name' },
        { name: 'age', title: 'Age' },
        { name: 'height', title: 'Height' },
        { name: 'phone', title: 'Phone' },
        { name: 'email', title: 'Email' },
    ];
    return (
        <CollectionProvider dataOptions={dataOptions} fields={fields}>
            <Table />
        </CollectionProvider>
    );
}