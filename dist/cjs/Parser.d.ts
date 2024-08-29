import TokenStream from './TokenStream';
import { Node } from './Nodes';
type OperatorMap = {
    [s: string]: {
        precedence: number;
        associativity: number;
    };
};
export default class Parser {
    binaryOperators: OperatorMap;
    constructor();
    parse(stream: TokenStream): Node;
    parseExpression(stream: TokenStream, precedence?: number | undefined): Node;
    parsePrimary(stream: TokenStream): Node;
    parsePrimaryExpression(stream: TokenStream): Node;
}
export {};
