"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
const BinaryNode_1 = __importDefault(require("./Nodes/BinaryNode"));
const NameNode_1 = __importDefault(require("./Nodes/NameNode"));
const NumberNode_1 = __importDefault(require("./Nodes/NumberNode"));
const StringNode_1 = __importDefault(require("./Nodes/StringNode"));
const SyntaxError_1 = __importDefault(require("./SyntaxError"));
const LEFT_ASSOCIATIVE = 1;
class Parser {
    constructor() {
        this.binaryOperators = {
            or: { precedence: 10, associativity: LEFT_ASSOCIATIVE },
            '||': { precedence: 10, associativity: LEFT_ASSOCIATIVE },
            and: { precedence: 20, associativity: LEFT_ASSOCIATIVE },
            '&&': { precedence: 20, associativity: LEFT_ASSOCIATIVE },
            '=': { precedence: 30, associativity: LEFT_ASSOCIATIVE },
            '!=': { precedence: 30, associativity: LEFT_ASSOCIATIVE },
            '<': { precedence: 30, associativity: LEFT_ASSOCIATIVE },
            '>': { precedence: 30, associativity: LEFT_ASSOCIATIVE },
            '>=': { precedence: 30, associativity: LEFT_ASSOCIATIVE },
            '<=': { precedence: 30, associativity: LEFT_ASSOCIATIVE },
            '+': { precedence: 40, associativity: LEFT_ASSOCIATIVE },
            '-': { precedence: 40, associativity: LEFT_ASSOCIATIVE },
            '*': { precedence: 50, associativity: LEFT_ASSOCIATIVE },
            '/': { precedence: 50, associativity: LEFT_ASSOCIATIVE },
        };
    }
    parse(stream) {
        const node = this.parseExpression(stream);
        if (!stream.isEOF()) {
            const token = stream.getCurrent();
            throw new SyntaxError_1.default(`Unexpected token "${token.type}" of value "${token.getValue()}"`);
        }
        return node;
    }
    parseExpression(stream, precedence = undefined) {
        let expr = this.parsePrimary(stream);
        let token;
        while (!stream.isEOF() && (token = stream.getCurrent()) && token.isBinaryOperator()) {
            const value = token.getValue();
            if (value === null) {
                throw new Error();
            }
            const op = this.binaryOperators[value];
            if (op === undefined) {
                throw new Error();
            }
            if (precedence !== undefined && op.precedence < precedence) {
                break;
            }
            stream.next();
            const isLeftAssociative = LEFT_ASSOCIATIVE === op.associativity;
            const right = this.parseExpression(stream, isLeftAssociative ? op.precedence + 1 : op.precedence);
            expr = new BinaryNode_1.default(value, expr, right);
        }
        return expr;
    }
    parsePrimary(stream) {
        const token = stream.getCurrent();
        if (token.type === Token_1.OPEN_PAREN) {
            stream.next();
            const expr = this.parseExpression(stream);
            stream.expect(Token_1.CLOSE_PAREN, ')', 'An opened parenthesis is not properly closed');
            return expr;
        }
        return this.parsePrimaryExpression(stream);
    }
    parsePrimaryExpression(stream) {
        const token = stream.getCurrent();
        const value = token.getValue();
        if (value === null) {
            throw new Error();
        }
        switch (token.type) {
            case Token_1.IDENTIFIER:
                stream.next();
                return new NameNode_1.default(value);
            case Token_1.NUMBER:
                stream.next();
                return new NumberNode_1.default(value);
            case Token_1.STRING:
                stream.next();
                return new StringNode_1.default(value);
            default:
                throw new SyntaxError_1.default(`Unexpected token "${token.type}" of value "${value}"`);
        }
    }
}
exports.default = Parser;
