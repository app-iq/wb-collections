import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { State } from '../Data/State';
import { useServiceFactory, useState } from 'wb-core-provider';
import { ServiceFactory } from '../Service/ServiceFactory';
import { useCollectionDefaults } from '../Defaults/Hooks';

interface Props {
    scrollTarget?: 'document' | 'wrapper';
    threshold?: number;
}

export const InfiniteScroll: React.FC<PropsWithChildren<Props>> = props => {
    const ref = useRef<HTMLDivElement>(null);
    const defaults = useCollectionDefaults();
    const scrollTarget = props.scrollTarget ?? 'document';
    const threshold = props.threshold ?? defaults.renderOptions.infinityScrollThreshold;
    const state: State = useState();
    const serviceFactory: ServiceFactory = useServiceFactory();

    useEffect(() => {
        const div = ref.current as HTMLDivElement;
        const wrapper: HTMLElement | null = div.parentElement;
        const listener = () => {
            const target = scrollTarget === 'document' ? document.documentElement : wrapper;
            if (target === null) {
                return;
            }
            const { scrollTop, scrollHeight, clientHeight } = target;
            if (scrollTop + clientHeight >= scrollHeight - threshold) {
                const canFetchNextPage = !state.loading && !state.error && state.allItems.length < state.totalCount;
                if (canFetchNextPage) {
                    const fetchService = serviceFactory.createHttpFetchService();
                    fetchService.fetchNextPage();
                }
            }
        };
        div.addEventListener('wheel', listener, {
            passive: true,
        });

        return () => div.removeEventListener('wheel', listener);
    }, [state, serviceFactory, scrollTarget, threshold]);

    return <div ref={ref}>{props.children}</div>;
};
