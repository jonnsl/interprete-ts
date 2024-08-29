import { IDENTIFIER, NUMBER, STRING, OPEN_PAREN, CLOSE_PAREN } from './Token';
import BinaryNode from './Nodes/BinaryNode';
import NameNode from './Nodes/NameNode';
import NumberNode from './Nodes/NumberNode';
import StringNode from './Nodes/StringNode';
import ExpressionSyntaxError from './SyntaxError';
const LEFT_ASSOCIATIVE = 1;
export default class Parser {
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
            throw new ExpressionSyntaxError(`Unexpected token "${token.type}" of value "${token.getValue()}"`);
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
            expr = new BinaryNode(value, expr, right);
        }
        return expr;
    }
    parsePrimary(stream) {
        const token = stream.getCurrent();
        if (token.type === OPEN_PAREN) {
            stream.next();
            const expr = this.parseExpression(stream);
            stream.expect(CLOSE_PAREN, ')', 'An opened parenthesis is not properly closed');
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
            case IDENTIFIER:
                stream.next();
                return new NameNode(value);
            case NUMBER:
                stream.next();
                return new NumberNode(value);
            case STRING:
                stream.next();
                return new StringNode(value);
            default:
                throw new ExpressionSyntaxError(`Unexpected token "${token.type}" of value "${value}"`);
        }
    }
}
