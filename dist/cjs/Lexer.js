"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tokenize;
const Token_1 = __importStar(require("./Token"));
const STRING_REGEX = /^"[^"\\]*(?:\\.[^"\\]*)*"/;
const BOOL_REGEX = /^(?:AND|OR|&&|\|\|)/;
const IDENTIFIER_REGEX = /^[_a-zA-Z][_a-zA-Z0-9]*/;
const NUMBER_REGEX = /^(?:-?[0-9]*,[0-9]+|-?[0-9]+)/;
const MATH_REGEX = /^(?:\+|-|\*|\/)/;
const COMPARISON_REGEX = /^(?:<=|<|>=|>|=|!=|<>)/;
/**
 * A generator function that produces a stream of lexemes for a given input
 */
function* tokenize(input) {
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
            yield new Token_1.default(Token_1.STRING, stripcslashes(matches[0].substring(1, matches[0].length - 1)));
        }
        else if ((matches = BOOL_REGEX.exec(input.substring(offset))) && matches.length > 0) {
            offset += matches[0].length;
            yield new Token_1.default(Token_1.BOOLEAN_OPERATOR, matches[0]);
        }
        else if ((matches = IDENTIFIER_REGEX.exec(input.substring(offset))) && matches.length > 0) {
            offset += matches[0].length;
            yield new Token_1.default(Token_1.IDENTIFIER, matches[0]);
        }
        else if ((matches = NUMBER_REGEX.exec(input.substring(offset))) && matches.length > 0) {
            offset += matches[0].length;
            yield new Token_1.default(Token_1.NUMBER, matches[0]);
        }
        else if ((matches = MATH_REGEX.exec(input.substring(offset))) && matches.length > 0) {
            offset += matches[0].length;
            yield new Token_1.default(Token_1.MATH_OPERATOR, matches[0]);
        }
        else if ((matches = COMPARISON_REGEX.exec(input.substring(offset))) && matches.length > 0) {
            offset += matches[0].length;
            yield new Token_1.default(Token_1.COMPARISON_OPERATOR, matches[0]);
        }
        else if (input[offset] === '(') {
            ++offset;
            yield new Token_1.default(Token_1.OPEN_PAREN);
        }
        else if (input[offset] === ')') {
            ++offset;
            yield new Token_1.default(Token_1.CLOSE_PAREN);
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
