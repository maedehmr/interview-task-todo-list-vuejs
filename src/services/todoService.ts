import type { Todo } from '@/types/todo'

const STORAGE_KEY = 'todos'

export const getTodos = (): Todo[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export const createTodo = (description: string): Todo => {
  const todos = getTodos()
  const newTodo: Todo = {
    id: Date.now(),
    description,
    status: false,
  }
  const updatedTodos = [...todos, newTodo]
  saveTodos(updatedTodos)
  return newTodo
}

export const updateTodo = (id: number, description: string): Todo | null => {
  const todos = getTodos()
  const index = todos.findIndex((todo) => todo.id === id)
  if (index === -1) return null
  todos[index].description = description
  saveTodos(todos)
  return todos[index]
}

export const getTodoById = (id: number): Todo | null => {
  const todos = getTodos()
  return todos.find((todo) => todo.id === id) || null
}

export const deleteTodo = (id: number): Todo[] => {
  const todos = getTodos()
  const updatedTodos = todos.filter((todo) => todo.id !== id)
  saveTodos(updatedTodos)
  return updatedTodos
}

export const toggleStatus = (id: number): Todo[] => {
  const todos = getTodos()
  const todo = todos.find((t) => t.id === id)
  if (todo) todo.status = !todo.status
  saveTodos(todos)
  return todos
}
