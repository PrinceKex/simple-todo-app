'use client'
import { FC, useState } from 'react'
import Todo from './todo'
import AddTodo from './addTodo'
import { addTodo, deleteTodo, editTodo, toggleTodo } from '@/actions/action'
import { todoType } from '@/types/todoType'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  todos: todoType[]
}

const Todos: FC<Props> = ({ todos }) => {
  // State to manage the list of todo items
  const [todoItems, setTodoItems] = useState<todoType[]>(todos)

  // Function to create a new todo item
  const createTodo = (value: string) => {
    const id = uuidv4()
    addTodo(id, value)
    setTodoItems((prev) => [...prev, { id: id, value, done: false }])
  }

  // Function to change the text of a todo item
  const changeTodoValue = (id: string, value: string) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, value } : todo))
    )
    editTodo(id, value)
  }

  // Function to toggle the "done" status of a todo item
  const toggleIsTodoDone = (id: string) => {
    setTodoItems((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
    toggleTodo(id)
  }

  // Function to delete a todo item
  const deleteTodoItem = (id: string) => {
    setTodoItems((prev) => prev.filter((todo) => todo.id !== id))
    deleteTodo(id)
  }

  // Rendering the Todo List component
  return (
    <main className='flex mx-auto max-w-xl w-full min-h-screen flex-col items-center p-16'>
      <div className='text-5xl font-medium'>To-do app</div>
      <div className='w-full flex flex-col mt-8 gap-2'>
        {/* Mapping through todoItems and rendering Todo component for each */}
        {todoItems.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            changeTodoValue={changeTodoValue}
            toggleIsTodoDone={toggleIsTodoDone}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </div>
      {/* Adding Todo component for creating new todos */}
      <AddTodo createTodo={createTodo} />
    </main>
  )
}

export default Todos
