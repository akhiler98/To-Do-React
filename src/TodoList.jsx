import "./TodoList.css";
import { Link } from "react-router-dom";
import TodolistContext from "./TodolistContext";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";

function TodoList() {
    const [checkboxStates, setCheckboxStates] = useState([]);
    const {todoLists,lists} = useContext(TodolistContext);
    
   

    useEffect(() => {
        todoLists() 
        console.log(lists);
    }, []);

    useEffect(() => {
      const initialCheckboxStates = lists.map(list => ({
          id: list.id,
          checked: list.task_completed === 'yes',
      }));
      setCheckboxStates(initialCheckboxStates);
  }, [lists]);

// console.log(checkboxStates);


const handleCheckChange = async (event, id) => {
  const value = event.target.checked;
  setCheckboxStates(prevState =>
      prevState.map(state =>
          state.id === id ? { ...state, checked: value } : state
      )   
  );

  const updatedTask = checkboxStates.find(state => state.id === id);
  if (updatedTask) {
      updatedTask.checked = value;
  }
  
  try {
    const response = await axios.post(`http://www.todo.test/api/checkboxtodo/${id}`, {
          completed: value ? 'yes' : 'no',
      });
      const response_data = response.data;
      console.log(response_data);
  
  } catch (error) {
      if (error.response && error.response.data) {
          setError(error.response.data.message);
      } else {
          console.error('Error updating task:', error);
      }
  }
 
};



const handleDelete = async (id)=>{
  try {
   const response = await axios.delete(`http://www.todo.test/api/deletetodo/${id}`);
   console.log(response);
   todoLists()
    
   } catch (error) {
       console.error('Error deleting task:', error);
   }
}

  return (
    <div className="mainContainer">
        <h1>ToDo List</h1>
        <div className="mainContainer-head">
            <p className="mainContainer-headTitle">All ToDo's</p>
            <Link className="addTodo" to={"/addtodo"}>Add ToDo</Link>
        </div>
        <div className="container">
            <table className="containerTable">
              <thead>
              <tr>
                  <th>NAME</th>
                  <th>DESCRIPTION</th>
                  <th>DAYS</th>
                  <th>COMPLETD</th>
                  <th>ACTIONS</th>
              </tr>
              </thead>
              <tbody>
                {
                    lists.map((list)=>{
                        return(
                            <>
                            <tr>
                              <td>{list.name}</td>
                              <td>{list.description}</td>
                              <td>{list.days}</td>
                              <td><input type="checkbox" checked={checkboxStates.find(state => state.id === list.id)?.checked || false} onChange={(e)=>{handleCheckChange(e,list.id)}} /></td>
                              <td><Link className="editTodo" to={`/edittodo/${list.id}`}>Edit</Link> <button onClick={()=>{handleDelete(list.id)}}>Delete</button></td>
                            </tr>
                            </>
                        )
                    })
                }
              </tbody>
            </table>
        </div>
    </div>
  )
}

export default TodoList