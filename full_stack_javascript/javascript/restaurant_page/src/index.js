import loadHomePage from "./home.js"
import loadMenuPage from "./menu.js"
import loadAboutPage from "./about.js"

const homeButton = document.querySelector("#home")
const menuButton = document.querySelector("#menu")
const aboutButton = document.querySelector("#about")
const content = document.querySelector("#content")

homeButton.addEventListener("click", () => {
    content.replaceChildren()
    loadHomePage()
})

menuButton.addEventListener("click", () => {
    content.replaceChildren()
    loadMenuPage()
})

aboutButton.addEventListener("click", () => {
    content.replaceChildren()
    loadAboutPage()
})

loadHomePage()