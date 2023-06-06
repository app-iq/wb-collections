import React from 'react';
import { useState } from 'wb-core-provider';
import { withCollection } from '../Collection/WithCollection';
import { State } from '../Data/State';
import { RenderOptions } from '../Data/Types/Elements';
import { getFieldValue } from '../Field/Field';
import { withCollectionData, WithCollectionDataProps } from '../HOCs/WithCollectionData';

type Props = WithCollectionDataProps & RenderOptions;

function _Table(props: Props) {
    const state: State = useState();
    const fields = state.fields;
    const data = props.items;
    const totalCount = props.totalCount;
    return (
        <>
            <h1>Total Count: {totalCount}</h1>
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
                                <td>{getFieldValue(field, item as Record<string, unknown>) as string}</td>
                            </React.Fragment>
                        ));
                        return <tr key={index}>{cells}</tr>;
                    })}
                </tbody>
            </table>
        </>
    );
}

export const Table = withCollectionData(withCollection(_Table));
