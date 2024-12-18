function merge(a, b) {
    let c = []
    let i = 0
    let j = 0

    while (i < a.length && j < b.length) {
        if (a[i] < b[j]) {
            c.push(a[i])
            i++
        } else {
            c.push(b[j])
            j++
        }
    }

    c.push(...a.slice(i));
    c.push(...b.slice(j));

    return c
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr

    const mid = Math.floor(arr.length / 2)
    const leftHalf = arr.slice(0, mid)
    const rightHalf = arr.slice(mid)

    const sortedLeft = mergeSort(leftHalf)
    const sortedRight = mergeSort(rightHalf)

    return merge(sortedLeft, sortedRight)
}

const arr = [3, 2, 1, 13, 8, 5, 0, 1]
console.log(`Before Merge Sort: ${arr}`)
console.log(`After Merge Sort: ${mergeSort(arr)}`)