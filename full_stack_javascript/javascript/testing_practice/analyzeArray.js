function analyzeArray(numbers) {
    return {
        average: numbers.reduce((acc, cur) => acc + cur, 0) / numbers.length,
        min: Math.min(...numbers),
        max: Math.max(...numbers),
        length: numbers.length
    }
}

console.log(analyzeArray([1, 8, 3, 4, 2, 6]))

module.exports = analyzeArray