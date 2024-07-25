import React from 'react'
import "./AddTodo.css";
import { Link } from 'react-router-dom';

function AddTodo() {
  return (
    <div className='addtodoContainer'>
        <div className='addtodoContainer-head'>
          <h3>CREATE TODO</h3>
          <Link className="createtodo" to={"/"}>BACK</Link>

        </div>
        <div className='addtodoContainer-content'>
            <form className='addContainer-form' action="">
                <input className='form-input' type="text" placeholder='Name'/> <br /><br />
                <input className='form-input' type="text" placeholder='Description(optional)'/> <br /><br />
                <input className='form-input' type="number" placeholder='Days'/> <br /><br />
                <button>Add Todo</button>

            </form>

        </div>

    </div>
  )
}

export default AddTodo