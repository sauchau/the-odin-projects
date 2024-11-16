import menuImage from "./menu.jpg"

export default () => {
    const content = document.querySelector("#content")

    const menuBanner = document.createElement("img")
    menuBanner.src = menuImage
    menuBanner.width = 600

    const heading = document.createElement("h1")
    heading.textContent = "Menu"

    const menuList = document.createElement("ul")
    const menu_items = {
        "Item1": "10",
        "Item2": "20",
        "Item3": "12",
        "Item4": "50",
        "Item5": "56",
    }
    for (let item in menu_items) {
        const menuItem = document.createElement("li")
        menuItem.textContent = `${item} ${menu_items[item]}`
        menuList.appendChild(menuItem)
    }

    content.appendChild(menuBanner)
    content.appendChild(heading)
    content.appendChild(menuList)
}