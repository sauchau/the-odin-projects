export const Data = (function () {
    let data = {}

    const getData = () => { return data }

    const setData = (newData) => { data = newData }

    const getProjects = () => { return Object.keys(data) }

    const getTodosForProject = (project) => { return data[project] }

    const getTodo = (project, index) => { return data[project][index] }

    function addProject(name) {
        data[name] = []
        saveToLocalStorage()
    }

    function addTodo(project, title, description, dueDate, priority, completed) {
        data[project].push({ project, title, description, dueDate, priority, completed })
        saveToLocalStorage()
    }

    function updateTodo(project, index, title, description, dueDate, priority, completed) {
        data[project][index] = { title, description, dueDate, priority, completed }
        saveToLocalStorage()
    }

    function deleteTodo(project, index) {
        data[project].splice(index, 1)
        saveToLocalStorage()
    }

    function saveToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(data))
    }

    return { getData, setData, getProjects, getTodosForProject, getTodo, addProject, addTodo, updateTodo, deleteTodo }
})()