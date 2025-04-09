// src/errors/NotFoundError.ts

import { CustomError } from './CustomError';

export class UserNotFoundError extends CustomError {
    constructor(message: string = 'User was not found') {
        super(404, message);
    }
}
