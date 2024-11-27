import { Data } from "./data.js"
import { UI } from "./ui.js"


export const Controller = (function () {
    let currentProject = ""
    let clickedTodoIndex = -1

    function init() {
        if (!loadTodosFromLocalStorage()) {
            createDefaultProject()
        }
        addEventListeners()
    }

    function loadTodosFromLocalStorage() {
        const savedTodos = localStorage.getItem("todos")
        if (savedTodos) {
            Data.setData(JSON.parse(savedTodos))
            UI.listAllProjects(Data.getProjects())
            return true
        }
        return false
    }

    function createDefaultProject() {
        const defaultName = "Default"
        Data.addProject(defaultName)
        UI.listAllProjects(Data.getProjects())
    }

    function addEventListeners() {
        const createTodoBtn = document.querySelector("#header div:nth-child(2) button:nth-child(1)")
        const createProjectBtn = document.querySelector("#header div:nth-child(2) button:nth-child(2)")
        const newProjectSubmitBtn = document.querySelector("#new-project-dialog button")
        const todoSaveBtn = document.querySelector("#todo-dialog form div:nth-child(6) button")
        const sidebar = document.querySelector("#project-sidebar")
        const todoListContainer = document.querySelector("#todo-list")
        const todoModal = document.querySelector("#todo-dialog")

        createTodoBtn.addEventListener("click", () => UI.showTodoModal())
        createProjectBtn.addEventListener("click", () => UI.showProjectModal())
        newProjectSubmitBtn.addEventListener("click", () => handleNewProjectSubmitBtnClick())
        todoSaveBtn.addEventListener("click", () => handleTodoSaveBtnClick())
        sidebar.addEventListener("click", (e) => {
            if (e.target && e.target.classList.contains("project-item")) {
                selectProject(e.target)
            }
        })
        todoListContainer.addEventListener("click", (e) => {
            if (e.target && e.target.classList.contains("todo-item")) {
                const index = Array.prototype.indexOf.call(todoListContainer.children, e.target)
                clickedTodoIndex = index
                const data = Data.getTodo(currentProject, index)
                UI.showTodoModal(data)
            }
            if (e.target && e.target.classList.contains("todo-delete-btn")) {
                const index = Array.prototype.indexOf.call(todoListContainer.children, e.target)
                Data.deleteTodo(currentProject, index)
                UI.listAllTodosForProject(Data.getTodosForProject(currentProject))
            }
        })
        todoModal.addEventListener("close", () => clickedTodoIndex = -1)
    }

    function handleNewProjectSubmitBtnClick() {
        const modal = document.querySelector("#new-project-dialog")
        const name = document.querySelector("#new-project-dialog input").value

        // check for blank input
        if (name.trim() === "") {
            alert("Blank name not allowed!")
            return
        }

        Data.addProject(name)
        UI.listAllProjects(Data.getProjects())
        UI.closeModal(modal)
    }

    function handleTodoSaveBtnClick() {
        const modal = document.querySelector("#todo-dialog")
        const title = document.querySelector("#todo-dialog form div:nth-child(1) input").value
        const desc = document.querySelector("#todo-dialog form div:nth-child(2) input").value
        const dueDate = document.querySelector("#todo-dialog form div:nth-child(3) input").value
        const priority = document.querySelector("#todo-dialog form div:nth-child(4) input:checked").value
        const completedEl = document.querySelector("#todo-dialog form div:nth-child(5) input:checked")

        if (currentProject === "") {
            alert("Select a project before adding a todo!")
            return
        }

        if (title.trim() === "") {
            alert("Blank title not allowed!")
            return
        }

        let completed
        if (completedEl === null) {
            completed = "No"
        } else {
            completed = "Yes"
        }

        // update todo or create new todo
        if (clickedTodoIndex !== -1) {
            Data.updateTodo(currentProject, clickedTodoIndex, title, desc, dueDate, priority, completed)
            UI.listAllTodosForProject(Data.getTodosForProject(currentProject))
            UI.closeModal(modal)
            clickedTodoIndex = -1
        } else {
            Data.addTodo(currentProject, title, desc, dueDate, priority, completed)
            UI.listAllTodosForProject(Data.getTodosForProject(currentProject))
            UI.closeModal(modal)
        }
    }

    function selectProject(el) {
        currentProject = el.innerText
        UI.highlightProject(el)
        UI.listAllTodosForProject(Data.getTodosForProject(currentProject))
    }

    return { init }
})()