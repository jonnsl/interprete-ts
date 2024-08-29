
import evaluate from './Interpreter'

test('Expression should evaluate to false', () => {
  const input = 'variable < 10'
  const result = evaluate(input, { variable: '10' })
  expect(result).toEqual(false)
})

test('Expression should evaluate to true', () => {
  const input = 'variable < 10'
  const result = evaluate(input, { variable: '9' })
  expect(result).toEqual(true)
})

test('Expression should evaluate to false if variable is equal to null', () => {
  const input = 'variable < 10'
  const result = evaluate(input, { variable: null })
  expect(result).toEqual(false)
})

test('Expression should evaluate to true if variable is equal to empty string', () => {
  const input = 'variable < 10'
  const result = evaluate(input, { variable: '' })
  expect(result).toEqual(true)
})
