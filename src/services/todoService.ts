import type { Todo } from "@/types/todo"

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

export const updateTodo = (id: number, updatedFields: Partial<Omit<Todo, 'id'>>): Todo | null => {
  const todos = getTodos()
  const index = todos.findIndex(todo => todo.id === id)
  if (index === -1) return null
  todos[index] = { ...todos[index], ...updatedFields }
  saveTodos(todos)
  return todos[index]
}

export const deleteTodo = (id: number) => {
  const todos = getTodos().filter(todo => todo.id !== id)
  saveTodos(todos)
}

export const toggleStatus = (id: number): Todo | null => {
  const todos = getTodos()
  const index = todos.findIndex(todo => todo.id === id)
  if (index === -1) return null
  todos[index].status = !todos[index].status
  saveTodos(todos)
  return todos[index]
}
