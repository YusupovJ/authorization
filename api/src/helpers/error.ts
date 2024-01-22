export class HTTPError {
    message: string;
    status: number;

    constructor(message: string, status: number = 500) {
        this.message = message;
        this.status = status;
    }
}

export class BadRequest extends HTTPError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class Unauthorized extends HTTPError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class Forbidden extends HTTPError {
    constructor(message: string) {
        super(message, 403);
    }
}

export class NotFound extends HTTPError {
    constructor(message: string) {
        super(message, 404);
    }
}
