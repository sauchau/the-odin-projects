export const UI = (function () {
    function showProjectModal() {
        document.querySelector("#new-project-dialog").showModal()
    }

    function showTodoModal(todoData) {
        const modal = document.querySelector("#todo-dialog")

        if (typeof todoData !== "undefined" && todoData !== null) {
            document.querySelector("#todo-title").value = todoData["title"]
            document.querySelector("#todo-desc").value = todoData["description"]
            document.querySelector("#todo-due-date").value = todoData["dueDate"]

            document.querySelector(`#${todoData["priority"].toLowerCase()}`).checked = true

            if (todoData["completed"] === "Yes") {
                document.querySelector("#completed").checked = true
            } else if (todoData["completed"] === "No") {
                document.querySelector("#completed").checked = false
            }
        }

        modal.showModal()
    }

    function closeModal(modal) {
        modal.close()
    }


    function listAllProjects(projects) {
        const sidebar = document.querySelector("#project-sidebar")
        clearProjectList(sidebar)

        for (const project of projects) {
            sidebar.appendChild(createProject(project))
        }
    }

    function clearProjectList(list) {
        list.replaceChildren()
    }

    function createProject(name) {
        const el = document.createElement("div")
        el.className = "project-item"
        el.innerText = name
        return el
    }

    function highlightProject(el) {
        unHighlightAllProjects()
        el.classList.add("project-item-selected")
    }

    function unHighlightAllProjects() {
        const projectItems = document.querySelectorAll(".project-item")
        for (const item of projectItems) {
            item.classList.remove("project-item-selected")
        }
    }

    function listAllTodosForProject(todos) {
        const todoListContainer = document.querySelector("#todo-list")
        clearTodoList(todoListContainer)

        for (const todo of todos) {
            todoListContainer.appendChild(createTodo(todo["title"], todo["dueDate"], todo["priority"], todo["completed"]))
        }
    }

    function clearTodoList(list) {
        list.replaceChildren()
    }

    function createTodo(title, date, priority, completed) {
        const titleDiv = document.createElement("div")
        titleDiv.innerText = title

        const dateDiv = document.createElement("div")
        dateDiv.innerText = date
        const priorityDiv = document.createElement("div")
        priorityDiv.innerText = priority
        const completedDiv = document.createElement("div")
        completedDiv.innerText = completed
        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Remove"
        deleteBtn.classList.add("todo-delete-btn")

        const rhsContainer = document.createElement("div")
        rhsContainer.appendChild(dateDiv)
        rhsContainer.appendChild(priorityDiv)
        rhsContainer.appendChild(completedDiv)
        rhsContainer.appendChild(deleteBtn)

        const container = document.createElement("div")
        container.classList.add("todo-item")
        container.appendChild(titleDiv)
        container.appendChild(rhsContainer)

        return container
    }

    return { showTodoModal, showProjectModal, closeModal, listAllProjects, highlightProject, listAllTodosForProject }
})()