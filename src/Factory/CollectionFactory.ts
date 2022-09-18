import {ReactElement} from 'react';

export interface CollectionFactory<TConfiguration> {
    create(configuration:TConfiguration) : ReactElement;
}
