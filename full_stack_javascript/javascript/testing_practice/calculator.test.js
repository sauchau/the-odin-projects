const calculator = require('./calculator')

const calc = calculator()

test('Calculator test 1', () => {
    expect(calc.add(5, 6)).toEqual(11)
})

test('Calculator test 2', () => {
    expect(calc.subtract(5, 6)).toEqual(-1)
})

test('Calculator test 3', () => {
    expect(calc.divide(100, 20)).toEqual(5)
})

test('Calculator test 4', () => {
    expect(calc.multiply(4, 3)).toEqual(12)
})