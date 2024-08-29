import Token from './Token.js';
export type TokenGenerator = Generator<Token, null, never>;
/**
 * A generator function that produces a stream of lexemes for a given input
 */
export default function tokenize(input: string): TokenGenerator;
