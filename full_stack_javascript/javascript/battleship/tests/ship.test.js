import Ship from "../src/ship.js"

test('Ship hit', () => {
    const ship = new Ship(5)
    ship.hit()
    expect(ship.hits).toEqual(1)
})

test('Ship not sunk yet', () => {
    const ship = new Ship(5)
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.sunk).not.toBeTruthy()
})

test('Ship sunk', () => {
    const ship = new Ship(5)
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.sunk).toBeTruthy()
})