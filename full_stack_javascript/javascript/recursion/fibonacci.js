function fibs(n) {
    const res = [0, 1]

    for (let i = 2; i < n; i++) {
        res.push(res[i - 1] + res[i - 2])
    }

    return res
}

function fibsRec(n) {
    if (n <= 1) {
        return n
    } else {
        return fibsRec(n - 1) + fibsRec(n - 2)
    }
}

const n = 8

// iterative way
console.log(fibs(n))

// recursive way
const resRec = []
for (let i = 0; i < n; i++) {
    resRec.push(fibsRec(i))
}
console.log(resRec)