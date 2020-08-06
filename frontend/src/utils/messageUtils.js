import {v4 as uuid} from 'uuid';

export function createMessage (message, severity) {
    return {
        id: uuid(),
        message: message,
        severity: severity
    }
}

