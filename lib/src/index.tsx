import React from 'react';
import ReactDOM from 'react-dom/client';
import { DefaultCollectionFactory } from './Factory/DefaultCollectionFactory';
import { Field } from './Field/Field';

const factory = new DefaultCollectionFactory();
const fields: Field[] = [
    {name: 'id', title: '#'},
    {name: 'name', title: 'Name'},
    {name: 'age', title: 'Age'},
    {name: 'height', title: 'Height'},
    {name: 'phone', title: 'Phone'},
    {name: 'email', title: 'Email'},
];

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        {
            factory.create({
                providerOptions: {
                    fetchOptions: {
                        data: [
                            {id: 1, name: 'test', age: 2, email: 'test' , phone: 'test', height: 'x'},
                            {id: 1, name: 'tesst', age: 2, email: 'test' , phone: 'test', height: 'x'},
                            {id: 1, name: 'tes3t', age: 2, email: 'test' , phone: 'test', height: 'x'},
                        ]
                    }, fields: fields
                }, renderOptions: {}
            })
        }
    </React.StrictMode>
);
