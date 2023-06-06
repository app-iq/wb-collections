import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { useState } from 'wb-core-provider';
import { withCollection } from '../Collection/WithCollection';
import { getFieldValue } from '../Field/Field';
import { withCollectionData } from '../HOCs/WithCollectionData';
function _Table(props) {
    const state = useState();
    const fields = state.fields;
    const data = props.items;
    const totalCount = props.totalCount;
    return (_jsxs(_Fragment, { children: [_jsxs("h1", { children: ["Total Count: ", totalCount] }), _jsxs("table", { children: [_jsx("thead", { children: _jsx("tr", { children: fields.map(field => (_jsx(React.Fragment, { children: _jsx("th", { children: field.title }) }, field.name))) }) }), _jsx("tbody", { children: data.map((item, index) => {
                            const cells = fields.map(field => (_jsx(React.Fragment, { children: _jsx("td", { children: getFieldValue(field, item) }) }, field.name)));
                            return _jsx("tr", { children: cells }, index);
                        }) })] })] }));
}
export const Table = withCollectionData(withCollection(_Table));
