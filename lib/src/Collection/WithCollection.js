import { jsx as _jsx } from "react/jsx-runtime";
import React, { Fragment } from 'react';
import { useState } from 'wb-core-provider';
import { useCollectionDefaults } from '../Defaults/Hooks';
export function withCollection(Component) {
    return function WithCollection(props) {
        const state = useState();
        const defaults = useCollectionDefaults();
        const isEmpty = state.allItems.length === 0 && !state.loading && !state.error;
        const displayCollectionOnEmpty = props.displayCollectionOnEmpty ?? defaults.renderOptions.displayCollectionOnEmpty;
        let collection = () => _jsx(Component, { ...props, data: state.allItems });
        const skipDisplayingCollection = (state.loading && state.allItems.length === 0) || state.error || (isEmpty && !displayCollectionOnEmpty);
        if (skipDisplayingCollection) {
            collection = null;
        }
        const elements = buildElements(state, defaults, isEmpty, props, collection);
        const orderElements = props.orderElements ?? defaults.renderOptions.orderElements;
        return (_jsx(React.Fragment, { children: orderElements(elements).map((element, index) => {
                if (element === null) {
                    return null;
                }
                else {
                    return _jsx(Fragment, { children: element() }, index);
                }
            }) }));
    };
}
function buildElements(state, defaults, isEmpty, props, collection) {
    return {
        loading: getComponentFromOptionsOrDefaultOptions(state.loading, props.renderLoading, defaults.renderOptions.renderLoading),
        error: getComponentFromOptionsOrDefaultOptions(!!state.error, props.renderError, defaults.renderOptions.renderError),
        empty: getComponentFromOptionsOrDefaultOptions(isEmpty, props.renderEmpty, defaults.renderOptions.renderEmpty),
        collection: collection,
    };
}
const getComponentFromOptionsOrDefaultOptions = (shouldDisplay, renderFromOptions, renderFromDefaults) => {
    if (shouldDisplay) {
        return renderFromOptions ?? renderFromDefaults ?? null;
    }
    else {
        return null;
    }
};
