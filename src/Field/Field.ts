import {ReactElement} from 'react';

type TransformFunc = (value: unknown, field: Field, record: unknown, index?: number) => unknown;

export interface Field {
    name: string;
    title: string;
    renderTitle?: (value: unknown, field: Field) => ReactElement | null;
    renderValue?: (value: unknown, field: Field, record: unknown, index?: number) => ReactElement | null;
    transform?: TransformFunc | TransformFunc[];
}

export function transformFieldValue(value: unknown, field: Field, record: unknown): unknown {
    if (!field.transform) {
        return value;
    }
    if (Array.isArray(field.transform)) {
        return field.transform.reduce((acc, func) => func(acc, field, record), value);
    }
    return field.transform(value, field, record);
}

export function getFieldValue(field: Field, record: Record<string, unknown>): unknown {
    return transformFieldValue(record[field.name], field, record);
}
