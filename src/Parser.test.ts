
import tokenize from './Lexer'
import TokenStream from './TokenStream'
import Parser from './Parser'
import BinaryNode from './Nodes/BinaryNode'
import NameNode from './Nodes/NameNode'
import StringNode from './Nodes/StringNode'

test('', () => {
  const input = 'variable = "string"'
  const lexemes = tokenize(input)
  const ast = (new Parser()).parse(new TokenStream(lexemes))
  expect(ast).toEqual(new BinaryNode('=', new NameNode('variable'), new StringNode('string')))
})
