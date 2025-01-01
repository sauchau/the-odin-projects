export default class View {
    createPlayerBoard(player) {
        const board = this.getElement(`#${player.type}-gameboard-container div:first-child`)
        board.replaceChildren()

        for (let i = 0; i < 100; i++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.classList.add('not-attacked')

            const pos = player.gameboard.getGameboard()[Math.floor(i / 10)][i % 10]
            if (pos === 0) {
                cell.textContent = ""
            } else {
                cell.textContent = "🚢"
            }

            board.appendChild(cell)
        }
    }

    getElement(selector) {
        return document.querySelector(selector)
    }

    removeInteractivityFromElement(el) {
        el.style.pointerEvents = 'none'
        el.style.opacity = '0.5'
    }

    addInteractivityFromElement(el) {
        el.style.pointerEvents = 'auto'
        el.style.opacity = '1'
    }
}