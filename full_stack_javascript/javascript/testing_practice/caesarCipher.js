function caesarCipher(text, shiftFactor) {
    let result = ''

    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i)

        if (code >= 65 && code <= 90) {
            result += String.fromCharCode(((code - 65 + shiftFactor) % 26) + 65)
        } else if (code >= 97 && code <= 122) {
            result += String.fromCharCode(((code - 97 + shiftFactor) % 26) + 97)
        } else {
            result += text[i]
        }
    }

    return result
}

module.exports = caesarCipher