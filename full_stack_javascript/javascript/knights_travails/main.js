function knightMoves(start, end) {
    const knightMoves = [
        [-2, -1],
        [-1, -2],
        [1, -2],
        [2, -1],
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1]
    ]

    function isValid(x, y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8
    }

    if (start[0] === end[0] && start[1] === end[1]) {
        console.log("Same start and end positions.")
        return
    }

    let queue = [[start[0], start[1]]]
    let visited = new Set()
    visited.add(`${start[0]},${start[1]}`)

    let parent = {}
    parent[`${start[0]},${start[1]}`] = null

    while (queue.length > 0) {
        const [x, y] = queue.shift()

        if (x === end[0] && y === end[1]) {
            let path = []
            let current = `${x},${y}`

            while (current !== null) {
                const [cx, cy] = current.split(',').map(Number)
                path.unshift([cx, cy])
                current = parent[current]
            }

            console.log(`You made it in ${path.length - 1} moves! Here's Your Path:`)
            path.forEach(value => {
                console.log(`[${value[0]}, ${value[1]}]`)
            })

            return
        }

        for (let move of knightMoves) {
            const newX = x + move[0]
            const newY = y + move[1]
            const newPos = `${newX},${newY}`

            if (isValid(newX, newY) && !visited.has(newPos)) {
                visited.add(newPos)
                parent[newPos] = `${x},${y}`
                queue.push([newX, newY])
            }
        }
    }

    console.log("There seems to be no path available.")
}

// example
const start = [0, 0]
const end = [7, 7]
knightMoves(start, end)