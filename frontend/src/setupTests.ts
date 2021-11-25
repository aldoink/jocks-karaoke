// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

process.env.REACT_APP_BACKEND_URL = 'http://backend.com'

class LocalStorageMock {
    store: any;
    length: number;
    key: (index: number) => string | null;

    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key: string) {
        return this.store[key] || null;
    }

    setItem(key: string, value: any) {
        this.store[key] = String(value);
    }

    removeItem(key: string) {
        delete this.store[key];
    }
}

global["localStorage"] = new LocalStorageMock();