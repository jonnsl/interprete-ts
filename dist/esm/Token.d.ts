export declare const STRING = 1;
export declare const BOOLEAN_OPERATOR = 2;
export declare const IDENTIFIER = 3;
export declare const NUMBER = 4;
export declare const MATH_OPERATOR = 5;
export declare const COMPARISON_OPERATOR = 6;
export declare const OPEN_PAREN = 7;
export declare const CLOSE_PAREN = 8;
export default class Token {
    type: number;
    value: string | null;
    constructor(type: number, value?: string | null);
    getValue(): string | null;
    isBinaryOperator(): boolean;
}
