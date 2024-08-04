import "./TodoList.css";
import { Link } from "react-router-dom";
import TodolistContext from "./TodolistContext";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";

function TodoList() {
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [errors, setErrors] = useState([])
  const [isVisible, setIsVisible] = useState(false);


  const { todoLists, lists } = useContext(TodolistContext);
  // if (errors.message) {
  //   console.log(errors.id);
  // }


  useEffect(() => {
    todoLists()
    console.log(lists);
  }, []);

  useEffect(() => {

    const initialCheckboxStates = lists.map(list => ({
      id: list.id,
      checked: list.task_completed === 'yes'

    }));
    setCheckboxStates(initialCheckboxStates);
  }, [lists, errors]);

  // console.log(checkboxStates);

  useEffect(() => {
    if (errors.message) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      setIsVisible(true);
      return () => clearTimeout(timer);
    }
  }, [errors]);


  const handleCheckChange = async (event, id) => {


    const value = event.target.checked;
    setCheckboxStates(prevState =>
      prevState.map(state =>
        state.id === id ? { ...state, checked: value } : state
      )
    );


    try {
      const response = await axios.post(`http://www.todo.test/api/checkboxtodo/${id}`, {
        completed: value ? 'yes' : 'no',
      });
      const response_data = response.data;
      console.log(response_data);

    } catch (error) {

      switch (error.response.status) {
        case 400:

          console.log('message:', error.response.data);
          setErrors(error.response.data)
          break;

        case 500:
          console.log('UNKNOWN ERROR', error.response.data);
          break;
      }
    }

  };



  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://www.todo.test/api/deletetodo/${id}`);
      console.log(response);
      todoLists()

    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }



  return (
    <>


      <div className="mainContainer">
        <h1>ToDo List</h1>
        <div className="mainContainer-head">
          <p className="mainContainer-headTitle">All ToDo's</p>
          <Link className="addTodo" to={"/addtodo"}>Add ToDo</Link>
        </div>

        {isVisible ? <p className="displayCheckbox-error">{errors.message} </p> : ""}

        <div className="container">
          <table className="containerTable">
            <thead>
              <tr>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>DAY</th>
                <th>COMPLETD</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {
                lists.map((list) => {
                  return (
                    <>
                      <tr key={list.id}>
                        <td>{list.name}</td>
                        <td>{list.description}</td>
                        <td>{list.day}</td>
                        <td><input type="checkbox" checked={checkboxStates.find(state => state.id === list.id)?.checked} onChange={(e) => { handleCheckChange(e, list.id) }} /></td>
                        <td><button className="actionButton actionButton-edit"><Link className="editTodo" to={`/edittodo/${list.id}`}>Edit</Link></button> <button className="actionButton actionButton-delete" onClick={() => { handleDelete(list.id) }}>Delete</button></td>
                      </tr>
                    </>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default TodoList