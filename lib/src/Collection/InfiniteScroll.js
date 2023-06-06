import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { useServiceFactory, useState } from 'wb-core-provider';
import { useCollectionDefaults } from '../Defaults/Hooks';
export const InfiniteScroll = props => {
    const ref = useRef(null);
    const defaults = useCollectionDefaults();
    const scrollTarget = props.scrollTarget ?? 'document';
    const threshold = props.threshold ?? defaults.renderOptions.infinityScrollThreshold;
    const state = useState();
    const serviceFactory = useServiceFactory();
    useEffect(() => {
        const div = ref.current;
        const wrapper = div.parentElement;
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
                    fetchService.fetchMore();
                }
            }
        };
        div.addEventListener('wheel', listener, {
            passive: true,
        });
        return () => div.removeEventListener('wheel', listener);
    }, [state, serviceFactory, scrollTarget, threshold]);
    return _jsx("div", { ref: ref, children: props.children });
};
