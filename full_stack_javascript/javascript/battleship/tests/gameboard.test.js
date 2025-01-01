import Ship from "../src/ship.js"
import Gameboard from "../src/gameboard.js"

test('gameboard has correct dimensions', () => {
    const gb = new Gameboard()
    expect(gb.getGameboard().length).toEqual(10)
    expect(gb.getGameboard()[0].length).toEqual(10)
})

test('gameboard has correct empty value', () => {
    const gb = new Gameboard()

    gb.getGameboard().forEach((row) => {
        expect(row).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    })
})

test('ship placed properly', () => {
    const gb = new Gameboard()
    gb.placeShip(3, 4, 3)
    expect(gb.getGameboard()[3][4]).toBeInstanceOf(Ship)
    expect(gb.getGameboard()[3][5]).toBeInstanceOf(Ship)
    expect(gb.getGameboard()[3][6]).toBeInstanceOf(Ship)
})