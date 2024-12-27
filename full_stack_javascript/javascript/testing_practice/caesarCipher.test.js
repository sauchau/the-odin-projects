const caesarCipher = require('./caesarCipher')

test('Caesar Cipher test 1', () => {
    expect(caesarCipher('xyz', 3)).toBe('abc')
})

test('Caesar Cipher test 2', () => {
    expect(caesarCipher('HeLLo', 3)).toBe('KhOOr')
})

test('Caesar Cipher test 3', () => {
    expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!')
})