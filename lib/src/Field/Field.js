export function transformFieldValue(value, field, record) {
    if (!field.transform) {
        return value;
    }
    if (Array.isArray(field.transform)) {
        return field.transform.reduce((acc, func) => func(acc, field, record), value);
    }
    return field.transform(value, field, record);
}
export function getFieldValue(field, record) {
    return transformFieldValue(record[field.name], field, record);
}
