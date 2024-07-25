import "./TodoList.css";
import { Link } from "react-router-dom";

function TodoList() {
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
            </table>
        </div>
    </div>
  )
}

export default TodoList