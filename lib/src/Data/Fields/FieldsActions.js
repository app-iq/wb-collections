export var FieldsActionType;
(function (FieldsActionType) {
    FieldsActionType["SET"] = "FIELDS_ACTION@SET";
    FieldsActionType["TOGGLE_VISIBILITY"] = "FIELDS_ACTION@TOGGLE_VISIBILITY";
    FieldsActionType["MOVE"] = "FIELDS_ACTION@MOVE_FIELD";
})(FieldsActionType || (FieldsActionType = {}));
export class FieldsActions {
    static set(fields) {
        return {
            type: FieldsActionType.SET,
            payload: fields,
        };
    }
    static toggleVisibility(fieldName) {
        return {
            type: FieldsActionType.TOGGLE_VISIBILITY,
            payload: fieldName,
        };
    }
    static move(fieldName, position) {
        return {
            type: FieldsActionType.MOVE,
            payload: {
                position: position,
                fieldName: fieldName,
            },
        };
    }
}
