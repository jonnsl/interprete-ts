
import tokenize from './Lexer'
import Token, {
  STRING, BOOLEAN_OPERATOR, IDENTIFIER, NUMBER,
  MATH_OPERATOR, COMPARISON_OPERATOR,
  OPEN_PAREN, CLOSE_PAREN,
} from './Token'

test('Expression Lexer: Variable with underscore, assignment and string', () => {
  const input = 'foo_bar = "string"'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'foo_bar'),
    new Token(COMPARISON_OPERATOR, '='),
    new Token(STRING, 'string'),
  ])
})

test('Expression Lexer: Variable, assignment and string', () => {
  const input = 'variable = "string"'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'variable'),
    new Token(COMPARISON_OPERATOR, '='),
    new Token(STRING, 'string'),
  ])
})

test('Expression Lexer: Variable, assignment and empty string', () => {
  const input = 'variable = ""'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'variable'),
    new Token(COMPARISON_OPERATOR, '='),
    new Token(STRING, ''),
  ])
})

test('Expression Lexer: Variable, assignment and string with spaces', () => {
  const input = 'variable = "string with spaces"'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'variable'),
    new Token(COMPARISON_OPERATOR, '='),
    new Token(STRING, 'string with spaces'),
  ])
})

test('Expression Lexer: Variable, assignment and string with escaped quotes', () => {
  const input = 'variable = "string with \\"quotes\\" inside"'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'variable'),
    new Token(COMPARISON_OPERATOR, '='),
    new Token(STRING, 'string with "quotes" inside'),
  ])
})

test('Expression Lexer: Variable, assignment and string with escaped slash', () => {
  const input = 'variable = "\\\\"'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'variable'),
    new Token(COMPARISON_OPERATOR, '='),
    new Token(STRING, '\\'),
  ])
})

test('Expression Lexer: Variable, assignment and number', () => {
  const input = 'variable = 0'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'variable'),
    new Token(COMPARISON_OPERATOR, '='),
    new Token(NUMBER, '0'),
  ])
})

test('Expression Lexer: Variable, sum and number', () => {
  const input = 'variable + 0'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'variable'),
    new Token(MATH_OPERATOR, '+'),
    new Token(NUMBER, '0'),
  ])
})

test('Expression Lexer: Variable, minus and number', () => {
  const input = 'variable - 0'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'variable'),
    new Token(MATH_OPERATOR, '-'),
    new Token(NUMBER, '0'),
  ])
})

test('Expression Lexer: Variable, times and number', () => {
  const input = 'variable * 0'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'variable'),
    new Token(MATH_OPERATOR, '*'),
    new Token(NUMBER, '0'),
  ])
})

test('Expression Lexer: Variable, division and number', () => {
  const input = 'variable / 0'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'variable'),
    new Token(MATH_OPERATOR, '/'),
    new Token(NUMBER, '0'),
  ])
})

test('Expression Lexer: Variable, greater or equal and number', () => {
  const input = 'variable >= 0'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'variable'),
    new Token(COMPARISON_OPERATOR, '>='),
    new Token(NUMBER, '0'),
  ])
})

test('Expression Lexer: just a single number', () => {
  const input = '0'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(NUMBER, '0'),
  ])
})

test('Expression Lexer: just a single decimal number', () => {
  const input = '0,0'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(NUMBER, '0,0'),
  ])
})

test('Expression Lexer: multiple variables, comparison and number', () => {
  const input = 'var var var === 0'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'var'),
    new Token(IDENTIFIER, 'var'),
    new Token(IDENTIFIER, 'var'),
    new Token(COMPARISON_OPERATOR, '='),
    new Token(COMPARISON_OPERATOR, '='),
    new Token(COMPARISON_OPERATOR, '='),
    new Token(NUMBER, '0'),
  ])
})

test('Expression Lexer: variable, assignment and negative number', () => {
  const input = 'variable = -123'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'variable'),
    new Token(COMPARISON_OPERATOR, '='),
    new Token(NUMBER, '-123'),
  ])
})

test('Expression Lexer: expression with parenthesis', () => {
  const input = '(1 + 3) * variable = -123'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(OPEN_PAREN),
    new Token(NUMBER, '1'),
    new Token(MATH_OPERATOR, '+'),
    new Token(NUMBER, '3'),
    new Token(CLOSE_PAREN),
    new Token(MATH_OPERATOR, '*'),
    new Token(IDENTIFIER, 'variable'),
    new Token(COMPARISON_OPERATOR, '='),
    new Token(NUMBER, '-123'),
  ])
})

test('Expression Lexer: expression with boolean operator OR', () => {
  const input = 'a > 0 OR b < 1'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'a'),
    new Token(COMPARISON_OPERATOR, '>'),
    new Token(NUMBER, '0'),
    new Token(BOOLEAN_OPERATOR, 'OR'),
    new Token(IDENTIFIER, 'b'),
    new Token(COMPARISON_OPERATOR, '<'),
    new Token(NUMBER, '1'),
  ])
})

test('Expression Lexer: expression with boolean operator AND', () => {
  const input = 'a > 0 AND b < 1'
  const lexemes = Array.from(tokenize(input))
  expect(lexemes).toEqual([
    new Token(IDENTIFIER, 'a'),
    new Token(COMPARISON_OPERATOR, '>'),
    new Token(NUMBER, '0'),
    new Token(BOOLEAN_OPERATOR, 'AND'),
    new Token(IDENTIFIER, 'b'),
    new Token(COMPARISON_OPERATOR, '<'),
    new Token(NUMBER, '1'),
  ])
})
