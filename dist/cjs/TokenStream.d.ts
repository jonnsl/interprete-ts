import Token from './Token';
import { TokenGenerator } from './Lexer';
export default class TokenStream {
    tokens: TokenGenerator;
    current: Token | null;
    done: boolean | null | undefined;
    constructor(tokens: TokenGenerator);
    next(): void;
    expect(type: number, value?: string | null, messagePrefix?: string | null): void;
    getCurrent(): Token;
    isEOF(): boolean;
}
