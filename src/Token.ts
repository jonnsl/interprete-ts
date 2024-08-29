
export const STRING = 1
export const BOOLEAN_OPERATOR = 2
export const IDENTIFIER = 3
export const NUMBER = 4
export const MATH_OPERATOR = 5
export const COMPARISON_OPERATOR = 6
export const OPEN_PAREN = 7
export const CLOSE_PAREN = 8

export default class Token {
  type: number
  value: string | null

  constructor (type: number, value: string | null = null) {
    this.type = type
    this.value = value
  }

  getValue (): string | null {
    return this.value
  }

  isBinaryOperator (): boolean {
    if (this.value === null) {
      return false
    }

    return (['or', '||', 'and', '&&', '=', '!=', '<', '>', '>=', '<=', '+', '-', '*', '/']).indexOf(this.value) !== -1
  }
}
