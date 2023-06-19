import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Action, Reducer, useDispatch, useState } from 'wb-core-provider';
import { CollectionProvider } from '../../CollectionProvider/CollectionProvider';
import { DefaultServiceFactory, ServiceFactory } from '../../Service/ServiceFactory';
import { State } from '../../Data/State';
import '@testing-library/jest-dom';

jest.mock('./../../Service/ServiceFactory', () => {
    return {
        DefaultServiceFactory: jest.fn().mockImplementation(() => {
            return {
                createHttpFetchService: jest.fn().mockReturnValue({ fetch: jest.fn() }),
                createBasicFetchService: jest.fn().mockReturnValue({ fetch: jest.fn() }),
            };
        }),
    };
});

describe('CollectionProvider', () => {
    it('should fetch using basic fetch service', () => {
        const mockFetch = jest.fn();
        const mockedServiceFactory = {
            createBasicFetchService: jest.fn().mockReturnValue({ fetch: mockFetch }),
        } as unknown as ServiceFactory;
        render(
            <CollectionProvider fetchOptions={{ data: [] }} serviceFactory={() => mockedServiceFactory} fields={[]} />
        );
        expect(mockedServiceFactory.createBasicFetchService).toBeCalled();
        expect(mockFetch).toBeCalled();
    });

    it('should fetch using http service', () => {
        const mockFetch = jest.fn();
        const mockedServiceFactory = {
            createHttpFetchService: jest.fn().mockReturnValue({ fetch: mockFetch }),
        } as unknown as ServiceFactory;
        render(
            <CollectionProvider fetchOptions={{ url: '/' }} serviceFactory={() => mockedServiceFactory} fields={[]} />
        );
        expect(mockedServiceFactory.createHttpFetchService).toBeCalled();
        expect(mockFetch).toBeCalled();
    });

    it('should use reducers from the props', async () => {
        function InnerComponent() {
            const state = useState<State>();
            const dispatch = useDispatch();
            return (
                <div>
                    <p>Items Count: {state.items.length}</p>
                    <button
                        type="button"
                        onClick={() => dispatch({ type: 'TEST-ACTION', payload: ['item-1', 'item-2'] })}
                    >
                        Action
                    </button>
                    <ul>
                        {state.items.map(item => (
                            <li key={item as string}>{item as string}</li>
                        ))}
                    </ul>
                </div>
            );
        }

        const reducer: Reducer<State, Action<string, string[]>> = (state, action) => {
            if (action.type === 'TEST-ACTION') {
                return { ...state, items: action.payload };
            }
            return state;
        };

        const mockedServiceFactory = {
            createBasicFetchService: jest.fn().mockReturnValue({ fetch: jest.fn() }),
        } as unknown as ServiceFactory;

        render(
            <CollectionProvider
                fetchOptions={{ data: [] }}
                fields={[]}
                serviceFactory={() => mockedServiceFactory}
                reducers={[reducer as Reducer<State, Action<unknown, unknown>>]}
            >
                <InnerComponent />
            </CollectionProvider>
        );
        expect(screen.getByText('Items Count: 0')).toBeInTheDocument();
        await act(() => userEvent.click(screen.getByText('Action')));
        expect(screen.getByText('Items Count: 2')).toBeInTheDocument();
        expect(screen.getByText('item-1')).toBeInTheDocument();
        expect(screen.getByText('item-2')).toBeInTheDocument();
    });

    it('should create service factory from props', () => {
        const createServiceFactoryMock = jest.fn().mockReturnValue({
            createBasicFetchService: jest.fn().mockReturnValue({ fetch: jest.fn() }),
        });
        render(
            <CollectionProvider fetchOptions={{ data: [] }} serviceFactory={createServiceFactoryMock} fields={[]} />
        );
        expect(createServiceFactoryMock).toBeCalled();
    });

    it('should use DefaultServiceFactory by default', () => {
        render(<CollectionProvider fetchOptions={{ data: [] }} fields={[]} />);
        const mockedDefaultServiceFactory = DefaultServiceFactory as jest.MockedClass<typeof DefaultServiceFactory>;
        expect(mockedDefaultServiceFactory).toBeCalled();
    });
});
