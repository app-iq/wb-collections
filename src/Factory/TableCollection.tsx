import React from 'react';
import { useState } from 'wbox-context';
import { withCollection } from '../Collection/WithCollection';
import { State } from '../Data/State';
import { getFieldValue } from '../Field/Field';

function _Table() {
    const state: State = useState();
    const fields = state.fields;
    const data = state.allItems;
    return (
        <>
            <table>
                <thead>
                    <tr>
                        {fields.map(field => (
                            <React.Fragment key={field.name}>
                                <th>{field.title}</th>
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        const cells = fields.map(field => (
                            <React.Fragment key={field.name}>
                                <td>{getFieldValue(field, item)}</td>
                            </React.Fragment>
                        ));
                        return <tr key={index}>{cells}</tr>;
                    })}
                </tbody>
            </table>
        </>
    );
};

export const Table = withCollection(_Table);
