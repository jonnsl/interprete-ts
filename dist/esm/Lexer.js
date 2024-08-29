import Token, { STRING, BOOLEAN_OPERATOR, IDENTIFIER, NUMBER, MATH_OPERATOR, COMPARISON_OPERATOR, OPEN_PAREN, CLOSE_PAREN, } from './Token';
const STRING_REGEX = /^"[^"\\]*(?:\\.[^"\\]*)*"/;
const BOOL_REGEX = /^(?:AND|OR|&&|\|\|)/;
const IDENTIFIER_REGEX = /^[_a-zA-Z][_a-zA-Z0-9]*/;
const NUMBER_REGEX = /^(?:-?[0-9]*,[0-9]+|-?[0-9]+)/;
const MATH_REGEX = /^(?:\+|-|\*|\/)/;
const COMPARISON_REGEX = /^(?:<=|<|>=|>|=|!=|<>)/;
/**
 * A generator function that produces a stream of lexemes for a given input
 */
export default function* tokenize(input) {
    input = input.replace('\t', ' ').replace('\r', ' ').replace('\n', ' ');
    const length = input.length;
    let offset = 0;
    let matches = null;
    while (offset < length) {
        if (input[offset] === ' ') {
            ++offset;
            continue;
        }
        if ((matches = STRING_REGEX.exec(input.substring(offset))) && matches.length > 0) {
            offset += matches[0].length;
            yield new Token(STRING, stripcslashes(matches[0].substring(1, matches[0].length - 1)));
        }
        else if ((matches = BOOL_REGEX.exec(input.substring(offset))) && matches.length > 0) {
            offset += matches[0].length;
            yield new Token(BOOLEAN_OPERATOR, matches[0]);
        }
        else if ((matches = IDENTIFIER_REGEX.exec(input.substring(offset))) && matches.length > 0) {
            offset += matches[0].length;
            yield new Token(IDENTIFIER, matches[0]);
        }
        else if ((matches = NUMBER_REGEX.exec(input.substring(offset))) && matches.length > 0) {
            offset += matches[0].length;
            yield new Token(NUMBER, matches[0]);
        }
        else if ((matches = MATH_REGEX.exec(input.substring(offset))) && matches.length > 0) {
            offset += matches[0].length;
            yield new Token(MATH_OPERATOR, matches[0]);
        }
        else if ((matches = COMPARISON_REGEX.exec(input.substring(offset))) && matches.length > 0) {
            offset += matches[0].length;
            yield new Token(COMPARISON_OPERATOR, matches[0]);
        }
        else if (input[offset] === '(') {
            ++offset;
            yield new Token(OPEN_PAREN);
        }
        else if (input[offset] === ')') {
            ++offset;
            yield new Token(CLOSE_PAREN);
        }
        else {
            throw new Error('Unexpected "' + input.substring(offset) + '" at position: ' + offset);
        }
    }
    return null;
}
/**
 * Un-quote string quoted with addcslashes()
 */
function stripcslashes(str) {
    let target = '';
    for (let i = 0, l = str.length; i < l; i++) {
        let s = str.charAt(i);
        let next = str.charAt(i + 1);
        if (s !== '\\' || !next) {
            target += s;
            continue;
        }
        switch (next) {
            case 'r':
                target += '\u000D';
                break;
            case 'a':
                target += '\u0007';
                break;
            case 'n':
                target += '\n';
                break;
            case 't':
                target += '\t';
                break;
            case 'v':
                target += '\v';
                break;
            case 'b':
                target += '\b';
                break;
            case 'f':
                target += '\f';
                break;
            case '\\':
                target += '\\';
                break;
            default:
                target += next;
                break;
        }
        ++i;
    }
    return target;
}
