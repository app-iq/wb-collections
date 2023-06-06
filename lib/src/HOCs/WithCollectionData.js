import { jsx as _jsx } from "react/jsx-runtime";
import { useCollectionData } from '../Hooks/UseCollectionData';
export function withCollectionData(Component) {
    return function WithCollectionDataWrapper(props) {
        const [items, totalCount, page] = useCollectionData();
        return _jsx(Component, { ...props, items: items, page: page, totalCount: totalCount });
    };
}
