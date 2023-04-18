class JSendResponse {
    constructor() {
        this.status = 'success';
        this.data = null;
        this.message = '';
    }

    success(data, message = "Request successful") {
        this.status = 'success';
        this.data = data;
        this.message = message;
        return this;
    }

    fail(message = "Request failed") {
        this.status = 'fail';
        this.message = message;
        return this;
    }

    error(message = "Request error") {
        this.status = 'error';
        this.message = message;
        return this;
    }
}

module.exports = {
    JSendResponse
};