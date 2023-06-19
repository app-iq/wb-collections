import { act, fireEvent, render } from '@testing-library/react';
import { useServiceFactory } from 'wb-core-provider';
import { useRenderFlags } from '../../Hooks/UseRenderFlags';
import { InfiniteScroll } from '../../CollectionProvider/InfiniteScroll';
import Mock = jest.Mock;

jest.mock('wb-core-provider', () => {
    return {
        useServiceFactory: jest.fn(),
    };
});

jest.mock('../../Hooks/UseRenderFlags', () => {
    return {
        useRenderFlags: jest.fn(),
    };
});

test('should fetch more data when scroll to the bottom of document', async () => {
    jest.spyOn(global.document.documentElement, 'scrollTop', 'get').mockReturnValue(100);
    jest.spyOn(global.document.documentElement, 'scrollHeight', 'get').mockReturnValue(100);
    jest.spyOn(global.document.documentElement, 'clientHeight', 'get').mockReturnValue(50);
    jest.spyOn(global.document, 'addEventListener').mockImplementation((_, listener) => {
        (listener as EventListener)({} as Event);
    });

    (useRenderFlags as Mock).mockReturnValue({ canFetchMore: true });
    const mockFetchMore = jest.fn();
    (useServiceFactory as Mock).mockReturnValue({
        createHttpFetchService: jest.fn().mockReturnValue({ fetchMore: mockFetchMore }),
    });

    const { container } = render(
        <InfiniteScroll>
            <div>Child Component</div>
        </InfiniteScroll>
    );

    await act(() => fireEvent.wheel(container, {}));

    expect(mockFetchMore).toBeCalledTimes(1);
});

test('should not fetch more data when scroll to the bottom of document but no more item to fetch', async () => {
    jest.spyOn(global.document.documentElement, 'scrollTop', 'get').mockReturnValue(100);
    jest.spyOn(global.document.documentElement, 'scrollHeight', 'get').mockReturnValue(100);
    jest.spyOn(global.document.documentElement, 'clientHeight', 'get').mockReturnValue(50);
    jest.spyOn(global.document, 'addEventListener').mockImplementation((_, listener) => {
        (listener as EventListener)({} as Event);
    });

    (useRenderFlags as Mock).mockReturnValue({ canFetchMore: false });
    const mockFetchMore = jest.fn();
    (useServiceFactory as Mock).mockReturnValue({
        createHttpFetchService: jest.fn().mockReturnValue({ fetchMore: mockFetchMore }),
    });

    const { container } = render(
        <InfiniteScroll>
            <div>Child Component</div>
        </InfiniteScroll>
    );

    await act(() => fireEvent.wheel(container, {}));

    expect(mockFetchMore).toBeCalledTimes(0);
});

test('should fetch more data when scroll to the bottom of div(scrollTarget=self)', async () => {
    (useRenderFlags as Mock).mockReturnValue({ canFetchMore: true });
    const mockFetchMore = jest.fn();
    (useServiceFactory as Mock).mockReturnValue({
        createHttpFetchService: jest.fn().mockReturnValue({ fetchMore: mockFetchMore }),
    });

    const { container } = render(
        <InfiniteScroll scrollTarget="self">
            <div>Child Component</div>
        </InfiniteScroll>
    );

    const div = container.querySelector('div') as HTMLDivElement;
    div.scrollTop = 50;
    Object.defineProperty(div, 'scrollHeight', { configurable: true, value: 100 });
    Object.defineProperty(div, 'clientHeight', { configurable: true, value: 100 });
    div.dispatchEvent(new WheelEvent('wheel', { clientY: 100 }));
    await act(() => fireEvent.wheel(container, {}));

    expect(mockFetchMore).toBeCalledTimes(1);
});

test('should threshold from the props', async () => {
    (useRenderFlags as Mock).mockReturnValue({ canFetchMore: true });
    const mockFetchMore = jest.fn();
    (useServiceFactory as Mock).mockReturnValue({
        createHttpFetchService: jest.fn().mockReturnValue({ fetchMore: mockFetchMore }),
    });

    const { container } = render(
        <InfiniteScroll scrollTarget="self" threshold={40}>
            <div>Child Component</div>
        </InfiniteScroll>
    );

    const div = container.querySelector('div') as HTMLDivElement;
    div.scrollTop = 80;
    Object.defineProperty(div, 'scrollHeight', { configurable: true, value: 200 });
    Object.defineProperty(div, 'clientHeight', { configurable: true, value: 80 });
    div.dispatchEvent(new WheelEvent('wheel', { clientY: 100 }));
    await act(() => fireEvent.wheel(container, {}));

    expect(mockFetchMore).toBeCalledTimes(1);
});

test('should remove listener when component unmount', async () => {
    const removeEventListener = jest.fn();
    jest.spyOn(global.document.documentElement, 'scrollTop', 'get').mockReturnValue(100);
    jest.spyOn(global.document.documentElement, 'scrollHeight', 'get').mockReturnValue(100);
    jest.spyOn(global.document.documentElement, 'clientHeight', 'get').mockReturnValue(50);
    jest.spyOn(global.document.documentElement, 'removeEventListener').mockImplementation(eventName => {
        removeEventListener(eventName);
    });

    (useRenderFlags as Mock).mockReturnValue({ canFetchMore: true });
    const mockFetchMore = jest.fn();
    (useServiceFactory as Mock).mockReturnValue({
        createHttpFetchService: jest.fn().mockReturnValue({ fetchMore: mockFetchMore }),
    });

    const { unmount } = render(
        <InfiniteScroll>
            <div>Child Component</div>
        </InfiniteScroll>
    );

    unmount();
    expect(removeEventListener).nthCalledWith(1, 'wheel');
});
