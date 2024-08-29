"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOSE_PAREN = exports.OPEN_PAREN = exports.COMPARISON_OPERATOR = exports.MATH_OPERATOR = exports.NUMBER = exports.IDENTIFIER = exports.BOOLEAN_OPERATOR = exports.STRING = void 0;
exports.STRING = 1;
exports.BOOLEAN_OPERATOR = 2;
exports.IDENTIFIER = 3;
exports.NUMBER = 4;
exports.MATH_OPERATOR = 5;
exports.COMPARISON_OPERATOR = 6;
exports.OPEN_PAREN = 7;
exports.CLOSE_PAREN = 8;
class Token {
    constructor(type, value = null) {
        this.type = type;
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    isBinaryOperator() {
        if (this.value === null) {
            return false;
        }
        return (['or', '||', 'and', '&&', '=', '!=', '<', '>', '>=', '<=', '+', '-', '*', '/']).indexOf(this.value) !== -1;
    }
}
exports.default = Token;
