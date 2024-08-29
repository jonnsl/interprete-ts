
import tokenize from './Lexer'
import TokenStream from './TokenStream'
import Parser from './Parser'
import { Node } from './Nodes'
import BinaryNode from './Nodes/BinaryNode'
import NameNode from './Nodes/NameNode'
import StringNode from './Nodes/StringNode'
import NumberNode from './Nodes/NumberNode'
import { ConstantsMap } from './Interpreter'

const validOperators = ['or', '||', 'and', '&&', '+', '-', '*', '/', '=', '!=', '<', '>', '>=', '<=']

/**
 * Checks if a given string is a valid expression.
 */
export default function validate (input: string, constants: ConstantsMap = {}): boolean {
  const lexemes = tokenize(input)
  try {
    const ast = (new Parser()).parse(new TokenStream(lexemes))
    return validateNode(ast, constants)
  } catch (e) {
    // console.error(e.message)
    return false
  }
}

function validateNode (node: Node, constants: ConstantsMap) {
  if (node instanceof BinaryNode) {
    return validOperators.indexOf(node.value) !== -1 &&
      validateNode(node.left, constants) &&
      validateNode(node.rigth, constants)
  } else if (node instanceof NameNode) {
    return constants[node.value] !== undefined
  }

  return node instanceof StringNode || node instanceof NumberNode
}
