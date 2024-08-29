"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = evaluate;
const Lexer_1 = __importDefault(require("./Lexer"));
const TokenStream_1 = __importDefault(require("./TokenStream"));
const Parser_1 = __importDefault(require("./Parser"));
const BinaryNode_1 = __importDefault(require("./Nodes/BinaryNode"));
const NameNode_1 = __importDefault(require("./Nodes/NameNode"));
const StringNode_1 = __importDefault(require("./Nodes/StringNode"));
const NumberNode_1 = __importDefault(require("./Nodes/NumberNode"));
function evaluate(input, constants = {}) {
    const lexemes = (0, Lexer_1.default)(input);
    const ast = (new Parser_1.default()).parse(new TokenStream_1.default(lexemes));
    return evaluateNode(ast, constants);
}
function evaluateNode(node, constants) {
    if (node instanceof BinaryNode_1.default) {
        const left = evaluateNode(node.left, constants);
        const rigth = evaluateNode(node.rigth, constants);
        if (isMathOperator(node.value)) {
            if (typeof left !== 'number') {
                throw new Error('The left-hand side of an arithmetic operation must be a number');
            }
            if (typeof rigth !== 'number') {
                throw new Error('The right-hand side of an arithmetic operation must be a number');
            }
            switch (node.value) {
                // Math
                case '+':
                    return left + rigth;
                case '-':
                    return left - rigth;
                case '*':
                    return left * rigth;
                case '/':
                    return left / rigth;
            }
        }
        // Booleans
        switch (node.value) {
            case 'or':
            case '||':
                return left || rigth;
            case 'and':
            case '&&':
                return left && rigth;
        }
        if (left === null || rigth === null) {
            return false;
        }
        // Comparisons
        switch (node.value) {
            case '=':
                return left === rigth;
            case '!=':
                return left !== rigth;
            case '<':
                return left < rigth;
            case '>':
                return left > rigth;
            case '>=':
                return left >= rigth;
            case '<=':
                return left <= rigth;
        }
        throw new Error('Unkown binary operator');
    }
    else if (node instanceof NameNode_1.default) {
        const value = constants[node.value];
        if (value === undefined) {
            throw new Error();
        }
        return value;
    }
    else if (node instanceof StringNode_1.default) {
        return node.value;
    }
    else if (node instanceof NumberNode_1.default) {
        return parseNumber(node.value);
    }
    throw new Error('Unkown node type');
}
/**
 * Parse a string into a float or int.
 */
function parseNumber(input) {
    input = input.replace(/^0+/, '0');
    if (input === '') {
        return 0;
    }
    return parseFloat(input.replace(',', '.'));
}
function isMathOperator(operator) {
    return operator === '+' || operator === '-' || operator === '*' || operator === '/';
}
