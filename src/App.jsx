import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import AddTodo from './AddTodo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/addtodo" element={<AddTodo />} /> 
            </Routes>
                    
       </BrowserRouter>
    </>
  )
}

export default App
