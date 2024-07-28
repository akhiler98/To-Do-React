import { useState } from 'react'
import './App.css'
import TodoList from './TodoList'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import AddTodo from './AddTodo'
import TodolistContext from './TodolistContext'
import EditTodo from './EditTodo'

function App() {
  const [lists, setLists] = useState([])

  const todoLists = async () => {
    const response = await fetch('http://www.todo.test/api/displaytodos');
    const data = await response.json();
    setLists(data)
    console.log(data);
}

  return (
    <>
    <TodolistContext.Provider value={{todoLists,lists}}>
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/addtodo" element={<AddTodo />} /> 
              <Route path="/edittodo/:id" element={<EditTodo />} /> 
            </Routes>
                    
       </BrowserRouter>
    </TodolistContext.Provider>
    </>
  )
}

export default App
