const todos = getSavedTodos()

const filters = {
    searchText : '',
    hideCompleted: false
}

renderTodo(todos,filters)

document.querySelector('#filter-todo').addEventListener('input',function(event){
    filters.searchText = event.target.value
    renderTodo(todos,filters)
})

document.querySelector('#form-name').addEventListener('submit',function(event){
    event.preventDefault()
    todos.push({
        id:uuidv4(),
        text: event.target.elements.firstName.value,
        completed: false
    })
    saveTodos(todos)
    renderTodo(todos,filters)
    event.target.firstName.value = ''
})

document.querySelector('#for-fun').addEventListener('change',function(event){
    filters.hideCompleted = event.target.checked
    renderTodo(todos,filters)
})