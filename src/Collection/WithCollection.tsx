import React, { Fragment } from 'react';
import { useState } from 'wbox-context';
import { State } from '../Data/State';
import { Elements } from '../Data/Types/OptionsState';

export interface WithCollectionProps {
    data: unknown[];
}

export const withCollection = (Component: React.ComponentType<WithCollectionProps>) => {
    return function WithCollection(props: object) {
        const state: State = useState();

        const isEmpty = state.data.length === 0 && !state.loading && !state.error;
        const displayCollectionOnEmpty = state.options.render.displayCollectionOnEmpty ?? false;
        let collection: any = () => <Component {...props} data={state.data} />;
        if (state.loading || state.error) {
            collection = null;
        } else if (isEmpty && !displayCollectionOnEmpty) {
            collection = null;
        }

        const elements: Elements = {
            loading: getComponentFromOptionsOrDefaultOptions(state.loading, state.options.render.renderLoading, () => (
                <h1>Loading</h1>
            )),
            error: getComponentFromOptionsOrDefaultOptions(!!state.error, state.options.render.renderError, () => (
                <h1>Error</h1>
            )),
            empty: getComponentFromOptionsOrDefaultOptions(isEmpty, state.options.render.renderEmpty, () => (
                <h1>Empty</h1>
            )),
            collection: collection,
        };
        // TODO : use defaults
        const orderElements = state.options.render.orderElements ?? defaultOrderElements;
        return (
            <React.Fragment>
                {orderElements(elements).map((element, index) => {
                    if (element === null) {
                        return null;
                    } else {
                        return <Fragment key={index}>{element()}</Fragment>;
                    }
                })}
            </React.Fragment>
        );
    };
};

const defaultOrderElements = (elements: Elements) => {
    return [elements.loading, elements.error, elements.empty, elements.collection];
};

const getComponentFromOptionsOrDefaultOptions = (
    shouldDisplay: boolean,
    renderFromOptions: any,
    renderFromDefaults: any,
) => {
    if (shouldDisplay) {
        return renderFromOptions ?? renderFromDefaults ?? null;
    } else {
        return null;
    }
};
