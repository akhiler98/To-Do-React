import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


function EditTodo() {
    const[errors,setErrors] = useState([])
    const [values, setValues] = useState({
        name: '',
        description: '',
        days: ''
    })
    // console.log(values);

    let {id} = useParams();
    const navigate = useNavigate();


    const findTodo = async () => {
        const response = await fetch(`http://www.todo.test/api/edittodo/${id}`);
        const data = await response.json();
        setValues(data)
        // console.log(data);
    }

    useEffect(() => {
        findTodo()
    }, []);

    const handleChange = (event)=>{
        setValues(current_values => {
            return ({...current_values,
                [event.target.name]: event.target.value
            });
        });
    }

    const updateTodo = async (event) => {
        event.preventDefault();
        
        try {
            
            const response = await axios.post(`http://www.todo.test/api/updatetodo/${id}`, values);
            const response_data = response.data;
            navigate('/')
            console.log(response_data);
        } catch (error) {
        
            switch (error.response.status) {
                case 422:
                    
                    console.log('VALIDATION FAILED:', error.response.data.errors);
                    setErrors(error.response.data.errors)
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
          <h3>EDIT TODO</h3>
          <Link className="createtodo" to={"/"}>BACK</Link>

        </div>
        <div className='addtodoContainer-content'>
            <form className='addContainer-form' action="" method='post' onSubmit={updateTodo}>
                <input className='form-input' type="text" name='name' value={values.name} onChange={handleChange} placeholder='Name'/> <br /><br />
                <input className='form-input' type="text" name='description' value={values.description} onChange={handleChange} placeholder='Description(optional)'/> <br /><br />
                <input className='form-input' type="number" name='days' value={values.days} onChange={handleChange} placeholder='Days'/> <br /><br />
                <button>UPDATE Todo</button>

            </form>

        </div>

    </div>
  )
}

export default EditTodo