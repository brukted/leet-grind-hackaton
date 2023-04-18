class JSendResponse {
    constructor() {
        this.status = 'success';
        this.data = undefined;
        this.message = '';
        this.stack = undefined;
    }

    success(data, message = "Request successful") {
        this.status = 'success';
        this.data = data;
        this.message = message;
        return this;
    }

    fail(message = "Request failed", stack = undefined) {
        this.status = 'fail';
        this.message = message;
        this.stack = stack;
        return this;
    }

    error(message = "Request error", stack = undefined) {
        this.status = 'error';
        this.message = message;
        this.stack = stack;
        return this;
    }
}

module.exports = {
    JSendResponse
};