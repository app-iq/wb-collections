import { ReactNode } from 'react';
import { DispatchFunction } from 'wb-provider';

export interface RenderValueOptions {
    field: Field;
    item: unknown;
    index: number;
    dispatch: DispatchFunction;
}

export interface Field {
    name: string;
    title: string;
    renderTitle?: (field: Field) => ReactNode;
    renderValue?: (options: RenderValueOptions) => ReactNode;
}
