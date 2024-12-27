const capitalize = require("./capitalize")

test('all characters lowercase', () => {
    expect(capitalize('firefox')).toBe('Firefox')
})

test('all characters uppercase', () => {
    expect(capitalize('FIREFOX')).toBe('Firefox')
})

test('exactly same', () => {
    expect(capitalize('Firefox')).toBe('Firefox')
})

test('with different example', () => {
    expect(capitalize('mozilla')).toBe('Mozilla')
})