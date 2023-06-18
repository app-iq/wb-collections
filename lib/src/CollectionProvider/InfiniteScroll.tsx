import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useServiceFactory, useState } from 'wb-core-provider';
import { State } from '../Data/State';
import { ServiceFactory } from '../Service/ServiceFactory';

type ScrollTarget = 'document' | 'wrapper';

interface Props {
    scrollTarget?: ScrollTarget;
    threshold?: number;
}

const DEFAULT_INFINITE_SCROLL_THRESHOLD = 10;

export function InfiniteScroll({
    scrollTarget: pScrollTarget,
    threshold: pThreshold,
    children,
}: PropsWithChildren<Props>) {
    const ref = useRef<HTMLDivElement>(null);
    const scrollTarget = pScrollTarget ?? 'document';
    const threshold = pThreshold ?? DEFAULT_INFINITE_SCROLL_THRESHOLD;
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
                const canFetchMore = !state.loading && !state.error && state.items.length < state.totalCount;
                if (canFetchMore) {
                    serviceFactory.createHttpFetchService().fetchMore();
                }
            }
        };

        div.addEventListener('wheel', listener, {
            passive: true,
        });

        return () => div.removeEventListener('wheel', listener);
    }, [state, serviceFactory, scrollTarget, threshold]);

    return <div ref={ref}>{children}</div>;
}
