//Getting existing todos
const getSavedTodos = function() {
    const todosJSON = localStorage.getItem('todos')
    if(todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

//Saving todos data to localStorage
const saveTodos = function(todos){
    localStorage.setItem('todos',JSON.stringify(todos))
}

//Render application todos based on filter
const renderTodo = function(todos,filters) {
    let filterTodos = todos.filter(function (todo){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    filterTodos = filterTodos.filter(function(todo){
        return !filters.hideCompleted || !todo.completed
    })
    document.querySelector('#todo-div').innerHTML = ' '
    filterTodos.forEach(function(todo){
        const newTodo = document.createElement('p')
        newTodo.textContent = todo.text
        document.querySelector('#todo-div').appendChild(newTodo)
    })
    const incompleteTodos = filterTodos.filter(function(todo){
        return !todo.completed
    })

    document.querySelector('#todo-div').innerHTML = ' '
    document.querySelector('#todo-div').appendChild(generateSummaryDOM(incompleteTodos))
    filterTodos.forEach(function(todo){
        document.querySelector('#todo-div').appendChild(generateTodoDOM(todo))
    })
}

//Remove a todo from Todos-List
const removeTodo = function(id) {
    const todoIndex = todos.findIndex(function(todos){
        return todos.id === id
    })
    if(todoIndex > -1){
        todos.splice(todoIndex,1)
    }
}


//Generate Todo DOM
const generateTodoDOM = function(todo) {
    const divEl = document.createElement('div')
    const but = document.createElement('button')
    const p = document.createElement('span')
    const check = document.createElement('input')
    check.setAttribute('type','checkbox')
    but.textContent = 'x'
    p.textContent = todo.text
    but.addEventListener('click',function(event){
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodo(todos,filters)
    })
    check.addEventListener('change',function(event){
        if(event.target.checked)    todo.completed = true
        saveTodos(todos)
        renderTodo(todos,filters)
    })
    divEl.appendChild(check)
    divEl.appendChild(p)
    divEl.appendChild(but)
    return divEl
}

//Generate Summary
const generateSummaryDOM = function(incomplete) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incomplete.length} todos left!!`
    return summary
}