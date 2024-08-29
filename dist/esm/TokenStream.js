import SyntaxError from './SyntaxError';
export default class TokenStream {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = null;
        this.done = null;
        this.next();
    }
    next() {
        if (this.isEOF()) {
            throw new SyntaxError('Unexpected end of input');
        }
        const next = this.tokens.next();
        this.done = next.done;
        this.current = next.done ? null : next.value;
    }
    expect(type, value = null, messagePrefix = null) {
        const token = this.current;
        if (token === null) {
            const message = `"${type}" expected ${value ? ` with value "${value}"` : ''}`;
            throw new SyntaxError('Unexpected end of input. ' + message);
        }
        else if (token.type !== type) {
            const message = `Unexpected token "${token.type}" of value "${token.value}" ("${type}" expected${value ? ` with value "${value}"` : ''})`;
            throw new SyntaxError(messagePrefix ? messagePrefix + ' ' + message : message /*, token.offset*/);
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
