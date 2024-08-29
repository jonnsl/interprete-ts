export const STRING = 1;
export const BOOLEAN_OPERATOR = 2;
export const IDENTIFIER = 3;
export const NUMBER = 4;
export const MATH_OPERATOR = 5;
export const COMPARISON_OPERATOR = 6;
export const OPEN_PAREN = 7;
export const CLOSE_PAREN = 8;
export default class Token {
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
