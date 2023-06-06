export var ModificationActionType;
(function (ModificationActionType) {
    ModificationActionType["INSERT"] = "ModificationAction@INSERT";
    ModificationActionType["UPDATE"] = "ModificationAction@UPDATE";
    ModificationActionType["REMOVE"] = "ModificationAction@REMOVE";
})(ModificationActionType || (ModificationActionType = {}));
export class ModificationActions {
    static insertAt(record, index) {
        return {
            type: ModificationActionType.INSERT,
            payload: {
                record: record,
                index: index,
            },
        };
    }
    static insertFirst(record) {
        return {
            type: ModificationActionType.INSERT,
            payload: {
                record: record,
                index: 'first',
            },
        };
    }
    static insertLast(record) {
        return {
            type: ModificationActionType.INSERT,
            payload: {
                record: record,
                index: 'last',
            },
        };
    }
    static update(changePayload, index) {
        return {
            type: ModificationActionType.UPDATE,
            payload: {
                changePayload: changePayload,
                index: index,
            },
        };
    }
    static remove(index) {
        return {
            type: ModificationActionType.REMOVE,
            payload: index,
        };
    }
    static removeFirst() {
        return {
            type: ModificationActionType.REMOVE,
            payload: 'first',
        };
    }
    static removeLast() {
        return {
            type: ModificationActionType.REMOVE,
            payload: 'last',
        };
    }
}
