import $ from '../util/QuerySelector.js'
import { 
  STATUS_ALL,
  STATUS_ACTIVE,
  STATUS_COMPLETED
} from '../util/Constant.js'

function TodoList ({
  todos,
  onToggleTodo,
  onRemoveTodo
}) {
  this.todoList = $('.todo-list')
  this.filters = $('.filters')

  this.onToggleTodo = onToggleTodo
  this.onRemoveTodo = onRemoveTodo
  this.todos = todos

  this.todoTemplate = (item) => {
    return `<li id=${item.id} ${item.status === 'completed' ? "class=completed" : ""}>
              <div class="view">
                <input class="toggle" type="checkbox" id=${item.id} ${item.status === 'completed' ? "class=completed" : "class=checked"} />
                <label class="label">${item.todo}</label>
                <button class="destroy" id="${item.id}"></button>
              </div>
            </li>`
  }
  
  this.handleMapAllTodo = () => {
    this.todos.map(item => {
      this.todoList.insertAdjacentHTML('beforeend', this.todoTemplate(item))
    })
  }

  this.handleMapActiveTodo = () => {
    const todos = this.todos.filter(item => item.status === 'active')
    todos.map(item => {
      this.todoList.insertAdjacentHTML('beforeend', this.todoTemplate(item))
    })
  }

  this.handleMapCompletedTodo = () => {
    const todos = this.todos.filter(item => item.status === 'completed')
    todos.map(item => {
      this.todoList.insertAdjacentHTML('beforeend', this.todoTemplate(item))
    })
  }

  this.mapTodos = (option = STATUS_ALL) => {
    this.todoList.innerHTML = '';

    switch(option) {
      case STATUS_ALL :
        this.handleMapAllTodo()
        break;
      case STATUS_ACTIVE :
        this.handleMapActiveTodo()
        break;
      case STATUS_COMPLETED :
        this.handleMapCompletedTodo()
        break;
    }
  }

  this.handleBindEvents = () => {
    this.filters.addEventListener("click", e => {
      if(e.target.nodeName === 'A') {
        e.target.closest('ul')
                .querySelectorAll('a')
                .forEach((target) => target.classList.remove('selected'))
        e.target.classList.add('selected')
      }
      if(e.target.classList.contains("active")) {
        this.mapTodos(STATUS_ACTIVE)
      } else if(e.target.classList.contains("completed")) {
        this.mapTodos(STATUS_COMPLETED)
      } else if(e.target.classList.contains("all")) {
        this.mapTodos(STATUS_ALL)
      }
    })

    this.todoList.addEventListener("click", e => {
      if(e.target.classList.contains("destroy")) {
        this.onRemoveTodo(e.target)
      } else if(e.target.classList.contains("toggle")) {
        this.onToggleTodo(e.target)
      }
    })
  }

  this.render = () => {
    this.handleBindEvents()
    this.mapTodos()
  }

  this.setState = (nextState) => {
    this.todos = nextState
    this.render()
  }

  this.render()
}

export default TodoList