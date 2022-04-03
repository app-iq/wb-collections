import { useEffect, useRef } from 'react';
import React from 'react';
import { State } from '../Data/State';
import { useServiceFactory, useState } from 'wbox-context';
import { ServiceFactory } from '../Service/ServiceFactory';

interface Props {
    scrollTarget?: 'document' | 'wrapper';
}

export const InfiniteScroll: React.FC<Props> = props => {
    const ref = useRef<any>();
    const scrollTarget = props.scrollTarget ?? 'document';
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
            if (scrollTop + clientHeight >= scrollHeight - 5) {
                if (!state.loading && !state.error && state.items.length < state.totalCount) {
                    const fetchService = serviceFactory.createHttpFetchService();
                    fetchService.fetchMore();
                }
            }
        };
        div.addEventListener('wheel', listener, {
            passive: true,
        });

        return () => div.removeEventListener('wheel', listener);
    });

    return <div ref={ref}>{props.children}</div>;
};
