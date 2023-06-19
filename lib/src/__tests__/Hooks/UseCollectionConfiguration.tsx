import { render, screen } from '@testing-library/react';
import { CollectionProvider } from '../../CollectionProvider/CollectionProvider';
import { useCollectionConfiguration } from '../../Hooks/UseCollectionConfiguration';
import '@testing-library/jest-dom';
import { ServiceFactory } from '../../Service/ServiceFactory';

test('should return collection configuration', () => {
    function InnerComponent() {
        const { fields, pageSize } = useCollectionConfiguration();

        return (
            <div>
                <p>Fields: {fields.length}</p>
                <ul>
                    {fields.map(field => (
                        <li key={field.name}>{field.title}</li>
                    ))}
                </ul>
                <p>Page size: {pageSize}</p>
            </div>
        );
    }

    render(
        <CollectionProvider
            fields={[
                { name: 'id', title: 'Name' },
                { name: 'email', title: 'Email' },
            ]}
            fetchOptions={{ data: [] }}
            pageSize={10}
            serviceFactory={() =>
                ({
                    createBasicFetchService: jest.fn().mockReturnValue({ fetch: jest.fn() }),
                } as unknown as ServiceFactory)
            }
        >
            <InnerComponent />
        </CollectionProvider>
    );

    expect(screen.getByText('Fields: 2')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Page size: 10')).toBeInTheDocument();
});
