# Interprete

Simple expression evaluator in typescript

* Math operators + - * /
* Boolean operators (or || and &&)
* Comparisons (= != < > <= >=)

## Installation

```bash
npm install --save @jonnsl/interprete
```

## Examples

```javascript
import evaluate from '@jonnsl/interprete';

const expression = 'year < 2004';
const result = evaluate(input, { year: '10' }); // result === true
```

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.
