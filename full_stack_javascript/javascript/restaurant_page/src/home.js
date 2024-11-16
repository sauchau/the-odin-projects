import homeImage from "./home.jpg"

export default () => {
    const content = document.querySelector("#content")

    const homeBanner = document.createElement("img")
    homeBanner.src = homeImage
    homeBanner.width = 600

    const heading = document.createElement("h1")
    heading.textContent = "My Cool Restaurant"

    const description = document.createElement("p")
    description.textContent = " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis libero dapibus, facilisis erat sed, efficitur felis. Vestibulum fringilla tellus ligula, nec iaculis nunc laoreet convallis. Integer condimentum vulputate pretium. Nulla euismod gravida vehicula. Vestibulum iaculis suscipit turpis, sed malesuada metus congue in. Curabitur nec justo nec nibh finibus venenatis ut sit amet sapien. Nunc ex magna, feugiat at euismod eget, hendrerit quis urna. In non mattis sapien. Nulla placerat felis eget nibh dapibus, ut malesuada nulla pretium. Suspendisse urna nulla, vestibulum a mattis id, pulvinar ac neque. Etiam faucibus nisl quam, eu viverra velit suscipit eget. Sed eget nisi nec nulla porttitor commodo."

    content.appendChild(homeBanner)
    content.appendChild(heading)
    content.appendChild(description)
}