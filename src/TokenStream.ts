
import SyntaxError from './SyntaxError'
import Token from './Token'
import { TokenGenerator } from './Lexer'

export default class TokenStream {
  tokens: TokenGenerator
  current: Token | null
  done: boolean | null | undefined

  constructor (tokens: TokenGenerator) {
    this.tokens = tokens
    this.current = null
    this.done = null
    this.next()
  }

  next (): void {
    if (this.isEOF()) {
      throw new SyntaxError('Unexpected end of input')
    }

    const next = this.tokens.next()
    this.done = next.done
    this.current = next.done ? null : next.value
  }

  expect (type: number, value: string | null = null, messagePrefix: string | null = null): void {
    const token = this.current
    if (token === null) {
      const message = `"${type}" expected ${value ? ` with value "${value}"` : ''}`
      throw new SyntaxError('Unexpected end of input. ' + message)
    } else if (token.type !== type) {
      const message = `Unexpected token "${token.type}" of value "${token.value}" ("${type}" expected${value ? ` with value "${value}"` : ''})`

      throw new SyntaxError(messagePrefix ? messagePrefix + ' ' + message : message/*, token.offset*/)
    }
    this.next()
  }

  getCurrent (): Token {
    if (this.current === null) {
      throw new Error('')
    }

    return this.current
  }

  isEOF (): boolean {
    return !!this.done
  }
}
