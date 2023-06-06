import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { DefaultCollectionFactory } from './Factory/DefaultCollectionFactory';
const factory = new DefaultCollectionFactory();
const fields = [
    { name: 'id', title: '#' },
    { name: 'name', title: 'Name' },
    { name: 'age', title: 'Age' },
    { name: 'height', title: 'Height' },
    { name: 'phone', title: 'Phone' },
    { name: 'email', title: 'Email' },
];
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: factory.create({
        providerOptions: {
            fetchOptions: {
                data: [
                    { id: 1, name: 'test', age: 2, email: 'test', phone: 'test', height: 'x' },
                    { id: 1, name: 'tesst', age: 2, email: 'test', phone: 'test', height: 'x' },
                    { id: 1, name: 'tes3t', age: 2, email: 'test', phone: 'test', height: 'x' },
                ]
            }, fields: fields
        }, renderOptions: {}
    }) }));
