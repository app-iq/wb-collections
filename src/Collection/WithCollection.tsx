import React, { Fragment, ReactElement } from 'react';
import { useState } from 'wbox-context';
import { State } from '../Data/State';
import { Elements } from '../Data/Types/Elements';
import { CollectionsDefaults } from '../Defaults/DefaultsContext';
import { useCollectionDefaults } from '../Defaults/Hooks';

export interface WithCollectionProps {
    data: unknown[];
}

export const withCollection = (Component: React.ComponentType<WithCollectionProps>) => {
    return function WithCollection(props: object) {
        const state: State = useState();
        const defaults = useCollectionDefaults();
        const isEmpty = state.allItems.length === 0 && !state.loading && !state.error;
        const displayCollectionOnEmpty =
            state.options.render.displayCollectionOnEmpty ?? defaults.renderOptions.displayCollectionOnEmpty;
        let collection: (() => ReactElement | null) | null = () => <Component {...props} data={state.allItems} />;
        // TODO : maybe this could move into defaults (check logic)
        if ((state.loading && state.allItems.length === 0) || state.error || (isEmpty && !displayCollectionOnEmpty)) {
            collection = null;
        }

        const elements = buildElements(state, defaults, isEmpty, collection);

        const orderElements = state.options.render.orderElements ?? defaults.renderOptions.orderElements;
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

function buildElements(
    state: State,
    defaults: CollectionsDefaults,
    isEmpty: boolean,
    collection: (() => ReactElement | null) | null,
): Elements {
    return {
        loading: getComponentFromOptionsOrDefaultOptions(
            state.loading,
            state.options.render.renderLoading,
            defaults.renderOptions.renderLoading,
        ),
        error: getComponentFromOptionsOrDefaultOptions(
            !!state.error,
            state.options.render.renderError,
            defaults.renderOptions.renderError,
        ),
        empty: getComponentFromOptionsOrDefaultOptions(
            isEmpty,
            state.options.render.renderEmpty,
            defaults.renderOptions.renderEmpty,
        ),
        collection: collection,
    };
}

const getComponentFromOptionsOrDefaultOptions = (
    shouldDisplay: boolean,
    renderFromOptions?: (() => ReactElement | null) | null,
    renderFromDefaults?: (() => ReactElement | null) | null,
) => {
    if (shouldDisplay) {
        return renderFromOptions ?? renderFromDefaults ?? null;
    } else {
        return null;
    }
};
