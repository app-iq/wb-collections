import { ReactElement } from 'react';

type TransformFunc = (value: any, field: Field, record: unknown, index?: number) => any;

export interface Field {
    name: string;
    title: string;
    renderTitle?: (value: any, field: Field) => ReactElement | null;
    renderValue?: (value: any, field: Field, record: unknown, index?: number) => ReactElement | null;
    transform?: TransformFunc | TransformFunc[];
}

export function transformFieldValue(value: any, field: Field, record: unknown): any {
    if (!field.transform) {
        return value;
    }
    if (Array.isArray(field.transform)) {
        return field.transform.reduce((acc, func) => func(acc, field, record), value);
    }
    return field.transform(value, field, record);
}

export function getFieldValue(field: Field, record: unknown): any {
    return transformFieldValue((record as any)[field.name], field, record);
}
