
import tokenize from './Lexer'
import TokenStream from './TokenStream'
import Parser from './Parser'
import BinaryNode from './Nodes/BinaryNode'
import NameNode from './Nodes/NameNode'
import StringNode from './Nodes/StringNode'
import NumberNode from './Nodes/NumberNode'
import { Node } from './Nodes'

export interface ConstantsMap {
  [k: string]: string | number | boolean | null
}

export default function evaluate (input: string, constants: ConstantsMap = {}) {
  const lexemes = tokenize(input)
  const ast = (new Parser()).parse(new TokenStream(lexemes))

  return evaluateNode(ast, constants)
}

function evaluateNode (node: Node, constants: ConstantsMap): string | number | boolean | null {
  if (node instanceof BinaryNode) {
    const left = evaluateNode(node.left, constants)
    const rigth = evaluateNode(node.rigth, constants)

    if (isMathOperator(node.value)) {
      if (typeof left !== 'number') {
        throw new Error('The left-hand side of an arithmetic operation must be a number')
      }
      if (typeof rigth !== 'number') {
        throw new Error('The right-hand side of an arithmetic operation must be a number')
      }

      switch (node.value) {
      // Math
      case '+':
        return left + rigth
      case '-':
        return left - rigth
      case '*':
        return left * rigth
      case '/':
        return left / rigth
      }
    }

    // Booleans
    switch (node.value) {
      case 'or':
      case '||':
        return left || rigth
      case 'and':
      case '&&':
        return left && rigth
    }

    if (left === null || rigth === null) {
      return false
    }

    // Comparisons
    switch (node.value) {
      case '=':
        return left === rigth
      case '!=':
        return left !== rigth
      case '<':
        return left < rigth
      case '>':
        return left > rigth
      case '>=':
        return left >= rigth
      case '<=':
        return left <= rigth
    }

    throw new Error('Unkown binary operator')
  } else if (node instanceof NameNode) {
    const value = constants[node.value]
    if (value === undefined) {
      throw new Error()
    }

    return value
  } else if (node instanceof StringNode) {
    return node.value
  } else if (node instanceof NumberNode) {
    return parseNumber(node.value)
  }

  throw new Error('Unkown node type')
}

/**
 * Parse a string into a float or int.
 */
function parseNumber (input: string): number {
  input = input.replace(/^0+/, '0')
  if (input === '') {
    return 0
  }

  return parseFloat(input.replace(',', '.'))
}

function isMathOperator (operator: string): boolean {
  return operator === '+' || operator === '-' || operator === '*' || operator === '/'
}
