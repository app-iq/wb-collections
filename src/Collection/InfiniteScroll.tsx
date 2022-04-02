import { useEffect, useRef } from 'react';
import React from 'react';

interface Props {
    scrollTarget?: 'document' | 'wrapper';
}

export const InfiniteScroll: React.FC<Props> = props => {
    const ref = useRef<any>();
    const scrollTarget = props.scrollTarget ?? 'document';
    
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
                console.log('Load More...');
            }
        };
        div.addEventListener('wheel', listener, {
            passive: true,
        });

        return () => div.removeEventListener('wheel', listener);
    });

    return <div ref={ref}>{props.children}</div>;
};
