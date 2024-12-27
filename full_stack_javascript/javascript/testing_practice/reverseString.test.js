const reverseString = require('./reverseString')

test('reverse string test 1', () => {
    expect(reverseString('0123456789')).toBe('9876543210')
})

test('reverse string test 2', () => {
    expect(reverseString('a quick brown fox jumps over the lazy dog')).toBe('god yzal eht revo spmuj xof nworb kciuq a')
})

test('reverse string test 3', () => {
    expect(reverseString('helLO')).toBe('OLleh')
})