"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxError_1 = __importDefault(require("./SyntaxError"));
class TokenStream {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = null;
        this.done = null;
        this.next();
    }
    next() {
        if (this.isEOF()) {
            throw new SyntaxError_1.default('Unexpected end of input');
        }
        const next = this.tokens.next();
        this.done = next.done;
        this.current = next.done ? null : next.value;
    }
    expect(type, value = null, messagePrefix = null) {
        const token = this.current;
        if (token === null) {
            const message = `"${type}" expected ${value ? ` with value "${value}"` : ''}`;
            throw new SyntaxError_1.default('Unexpected end of input. ' + message);
        }
        else if (token.type !== type) {
            const message = `Unexpected token "${token.type}" of value "${token.value}" ("${type}" expected${value ? ` with value "${value}"` : ''})`;
            throw new SyntaxError_1.default(messagePrefix ? messagePrefix + ' ' + message : message /*, token.offset*/);
        }
        this.next();
    }
    getCurrent() {
        if (this.current === null) {
            throw new Error('');
        }
        return this.current;
    }
    isEOF() {
        return !!this.done;
    }
}
exports.default = TokenStream;
