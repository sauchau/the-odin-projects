const myLibrary = []
const bookTable = document.getElementById("book-table")
const addBookDialog = document.querySelector("dialog")
const addBookBtn = document.getElementById("add-book")
const confirmBtn = document.getElementById("confirm-btn")
const bookTitleEl = document.getElementById("book-title")
const bookAuthorEl = document.getElementById("book-author")
const bookPagesEl = document.getElementById("book-pages")

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
}

function switchReadStatus(bookId) {
    if (myLibrary[bookId].read === "read") {
        myLibrary[bookId].read = "not read"
    } else if (myLibrary[bookId].read === "not read") {
        myLibrary[bookId].read = "read"
    }
}

function showBooks() {
    // remove all rows before populating table
    const rowCount = bookTable.rows.length
    for (let i = rowCount - 1; i > 0; i--) {
        bookTable.deleteRow(i)
    }

    // populate the table
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i]
        const newRow = bookTable.insertRow()
        newRow.dataset.rowId = i

        for (const prop in book) {
            const newCell = newRow.insertCell()
            newCell.innerHTML = book[prop]
        }

        // create the delete button and add it to the row
        const deleteButtonCell = newRow.insertCell()
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Remove"
        deleteButton.classList = "btn btn-danger"
        deleteButton.addEventListener("click", (e) => {
            myLibrary.splice(e.target.parentElement.parentElement.dataset.rowId, 1)
            showBooks()
        })
        deleteButtonCell.appendChild(deleteButton)

        // create the read status button and add it to the row
        const readStatusButtonCell = newRow.insertCell()
        const readStatusButton = document.createElement("button")
        readStatusButton.textContent = "Change Read Status"
        readStatusButton.classList = "btn btn-warning"
        readStatusButton.addEventListener("click", (e) => {
            const bookId = e.target.parentElement.parentElement.dataset.rowId
            switchReadStatus(bookId)
            showBooks()
        })
        readStatusButtonCell.appendChild(readStatusButton)
    }
}

addBookBtn.addEventListener("click", () => {
    addBookDialog.showModal()
})

addBookDialog.addEventListener("close", () => {
    if (addBookDialog.returnValue === "add_new_book") {
        const selectedRadioValue = document.querySelector("input[name=book-read]:checked").value
        addBookToLibrary(bookTitleEl.value, bookAuthorEl.value, bookPagesEl.value, selectedRadioValue)
    }
    showBooks()
})

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault()
    addBookDialog.close("add_new_book")
})