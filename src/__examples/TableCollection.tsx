import React from 'react';
import { useState } from 'wbox-context';
import { State } from '../Data/State';
import { getFieldValue } from '../Field/Field';

export const Table = () => {
    const state: State = useState();
    const fields = state.fields;
    const data = state.data;
    return (
        <table>
            <thead>
                {fields.map(field => (
                    <React.Fragment key={field.name}>
                        <th>{field.title}</th>
                    </React.Fragment>
                ))}
            </thead>
            <tbody>
                {data.map((item, index) => {
                    const cells = fields.map(field => (
                        <React.Fragment key={field.name}>
                            <td>{getFieldValue(field, item)}</td>
                        </React.Fragment>
                    ));
                    return <React.Fragment key={index}>{cells}</React.Fragment>;
                })}
            </tbody>
        </table>
    );
};
