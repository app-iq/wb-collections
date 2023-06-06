import {Field} from '../Field/Field';
import {HttpFetchOptions} from '../Service/Fetch/HttpFetchService';
import {DefaultCollectionFactory} from '../Factory/DefaultCollectionFactory';

export function Example() {
    const url = 'http://localhost:8080/collection?page=0';

    const dataOptions: HttpFetchOptions = {
        url: url,
        buildDataResult: (res: unknown) => ({
            items: (res as { data: unknown[] }).data,
            totalCount: (res as { totalCount: number }).totalCount
        }),
    };
    const fields: Field[] = [
        {name: 'id', title: '#'},
        {name: 'name', title: 'Name'},
        {name: 'age', title: 'Age'},
        {name: 'height', title: 'Height'},
        {name: 'phone', title: 'Phone'},
        {name: 'email', title: 'Email'},
    ];

    const factory = new DefaultCollectionFactory();
    return factory.create({
        providerOptions: {
            fetchOptions: {
                data: [
                    {id: 1, name: 'test', age: 2, email: 'test' , phone: 'test', height: 'x'},
                    {id: 1, name: 'tesst', age: 2, email: 'test' , phone: 'test', height: 'x'},
                    {id: 1, name: 'tes3t', age: 2, email: 'test' , phone: 'test', height: 'x'},
                ]
            }, fields: fields
        }, renderOptions: {}
    });
    // return (
    //     <CollectionProvider fetchOptions={dataOptions} fields={fields}>
    //         <div>
    //             <InfiniteScroll>
    //                 <Table/>
    //             </InfiniteScroll>
    //         </div>
    //     </CollectionProvider>
    // );
}
