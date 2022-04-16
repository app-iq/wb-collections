import { useEffect, useRef } from 'react';
import React from 'react';
import { State } from '../Data/State';
import { useServiceFactory, useState } from 'wbox-context';
import { ServiceFactory } from '../Service/ServiceFactory';
import { useCollectionDefaults } from '../Defaults/Hooks';

interface Props {
    scrollTarget?: 'document' | 'wrapper';
    threshold?: number;
}

export const InfiniteScroll: React.FC<Props> = props => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = useRef<any>();
    const defaults = useCollectionDefaults();
    const scrollTarget = props.scrollTarget ?? 'document';
    const threshold = props.threshold ?? defaults.renderOptions.infinityScrollThreshold;
    const state: State = useState();
    const serviceFactory: ServiceFactory = useServiceFactory();

    useEffect(() => {
        const div: HTMLDivElement = ref.current;
        const wrapper: HTMLElement | null = div.parentElement;
        const listener = () => {
            const target = scrollTarget === 'document' ? document.documentElement : wrapper;
            if (target === null) {
                return;
            }
            const { scrollTop, scrollHeight, clientHeight } = target;
            if (scrollTop + clientHeight >= scrollHeight - threshold) {
                // TODO : this condition could move to defaults provider or props or both
                if (!state.loading && !state.error && state.allItems.length < state.totalCount) {
                    const fetchService = serviceFactory.createHttpFetchService();
                    fetchService.fetchNextPage();
                }
            }
        };
        div.addEventListener('wheel', listener, {
            passive: true,
        });

        return () => div.removeEventListener('wheel', listener);
    }, [state, serviceFactory, scrollTarget , threshold]);

    return <div ref={ref}>{props.children}</div>;
};
