import {CollectionProviderProps} from '../CollectionProvider/CollectionProvider';
import {RenderOptions} from '../Data/Types/Elements';

export interface DefaultFactoryConfiguration {
    providerOptions: CollectionProviderProps;
    renderOptions: RenderOptions;
    infiniteScroll?: boolean;
    infiniteScrollTarget?: 'document' | 'wrapper';
}
