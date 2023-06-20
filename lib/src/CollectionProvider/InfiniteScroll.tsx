import { PropsWithChildren, useEffect, useRef } from 'react';
import { useServiceFactory } from 'wb-provider';
import { ServiceFactory } from '../Service/ServiceFactory';
import { useRenderFlags } from '../Hooks/UseRenderFlags';

type ScrollTarget = 'document' | 'self';

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
    const { canFetchMore } = useRenderFlags();
    const serviceFactory: ServiceFactory = useServiceFactory();

    useEffect(() => {
        const div = ref.current as HTMLDivElement;
        const target = scrollTarget === 'document' ? document.documentElement : div;

        const listener = () => {
            const { scrollTop, scrollHeight, clientHeight } = target;
            if (scrollTop + clientHeight >= scrollHeight - threshold) {
                if (canFetchMore) {
                    serviceFactory.createHttpFetchService().fetchMore();
                }
            }
        };

        target.addEventListener('wheel', listener, {
            passive: true,
        });

        return () => target.removeEventListener('wheel', listener);
    }, [canFetchMore, serviceFactory, scrollTarget, threshold]);

    return <div ref={ref}>{children}</div>;
}
