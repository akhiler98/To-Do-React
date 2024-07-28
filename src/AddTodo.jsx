import React from 'react'
import "./AddTodo.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
// import { useContext } from 'react';
// import TodolistContext from './TodolistContext';


function AddTodo() {
    const[errors,setErrors] = useState([])
    const [values, setValues] = useState({
        name: '',
        description: '',
        days: ''
    })

    // const {todoLists,lists} = useContext(TodolistContext);

    const navigate = useNavigate();



    const handleChange = (event)=>{
        setValues(current_values => {
            return ({...current_values,
                [event.target.name]: event.target.value
            });
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            
            const response = await axios.post('http://www.todo.test/api/createtodo', values);
            const response_data = response.data;
            navigate('/')
            console.log(response_data);
        } catch (error) {
            console.log(error);
        
            switch (error.response.status) {
                case 422:
                    
                    console.log('VALIDATION FAILED:', error.response.data.errors);
                    setErrors(error.response.data.errors)
                    break;
                case 400:
                    console.log('message:', error.response.data);
                    break;

                case 500:
                    console.log('UNKNOWN ERROR', error.response.data);
                    break;
            }
        }
    }


  return (
    <div className='addtodoContainer'>
        <div className='addtodoContainer-head'>
          <h3>CREATE TODO</h3>
          <Link className="createtodo" to={"/"}>BACK</Link>

        </div>
        <div className='addtodoContainer-content'>
            <form className='addContainer-form' action="" method='post' onSubmit={handleSubmit}>
                <input className='form-input' type="text" name='name' value={values.name} onChange={handleChange} placeholder='Name'/> <br /><br />
                <input className='form-input' type="text" name='description' value={values.description} onChange={handleChange} placeholder='Description(optional)'/> <br /><br />
                <input className='form-input' type="number" name='days' value={values.days} onChange={handleChange} placeholder='Days'/> <br /><br />
                <button>Add Todo</button>

            </form>

        </div>

    </div>
  )
}

export default AddTodo