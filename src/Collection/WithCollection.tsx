import React, {Fragment, ReactElement} from 'react';
import {useState} from 'wb-core-provider';
import {State} from '../Data/State';
import {Elements, RenderOptions} from '../Data/Types/Elements';
import {CollectionsDefaults} from '../Defaults/DefaultsContext';
import {useCollectionDefaults} from '../Defaults/Hooks';

export interface WithCollectionProps {
    data: unknown[];
}


export function withCollection<T extends RenderOptions>(Component: React.ComponentType<T & WithCollectionProps>) {
    return function WithCollection(props: T) {
        const state: State = useState();
        const defaults = useCollectionDefaults();
        const isEmpty = state.allItems.length === 0 && !state.loading && !state.error;
        const displayCollectionOnEmpty =
            props.displayCollectionOnEmpty ?? defaults.renderOptions.displayCollectionOnEmpty;
        let collection: (() => ReactElement | null) | null = () => <Component {...props} data={state.allItems} />;
        const skipDisplayingCollection = (state.loading && state.allItems.length === 0) || state.error || (isEmpty && !displayCollectionOnEmpty);
        if (skipDisplayingCollection) {
            collection = null;
        }

        const elements = buildElements(state, defaults, isEmpty, props, collection);

        const orderElements = props.orderElements ?? defaults.renderOptions.orderElements;
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
}

function buildElements(
    state: State,
    defaults: CollectionsDefaults,
    isEmpty: boolean,
    props: unknown & RenderOptions,
    collection: (() => ReactElement | null) | null,
): Elements {
    return {
        loading: getComponentFromOptionsOrDefaultOptions(
            state.loading,
            props.renderLoading,
            defaults.renderOptions.renderLoading,
        ),
        error: getComponentFromOptionsOrDefaultOptions(
            !!state.error,
            props.renderError,
            defaults.renderOptions.renderError,
        ),
        empty: getComponentFromOptionsOrDefaultOptions(
            isEmpty,
            props.renderEmpty,
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
