import React from "react";
import { useCollectionData } from "../Hooks/UseCollectionData";

export interface WithCollectionDataProps {
    items: unknown[];
    page: number;
    totalCount: number;
}

export function withCollectionData(Component : React.ComponentType<any>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function WithCollectionData(props:any) {
        const [items , totalCount , page] = useCollectionData();
        return <Component {...props} items={items} page={page} totalCount={totalCount} />;
    }
}