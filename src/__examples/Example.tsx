import React from "react";
import { CollectionProvider } from '../CollectionProvider/CollectionProvider';

export function Example() {
    return (
        <CollectionProvider>
            <h1>testing</h1>
        </CollectionProvider>
    );
}
