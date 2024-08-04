import React from 'react'
import "./AddTodo.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';



function AddTodo() {
    const [errors, setErrors] = useState([])
    const [values, setValues] = useState({
        name: '',
        description: '',
        day: ''
    })

    // console.log('errors', errors);
   
    const navigate = useNavigate();



    const handleChange = (event) => {
        setValues(current_values => {
            return ({
                ...current_values,
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
                    setErrors(error.response.data)
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
                <h3 className='addtodoContainer-headTitle'>CREATE TODO</h3>
                <Link className="createtodo" to={"/"}>BACK</Link>

            </div>

            <p className='displayMessage'>{errors.message ? errors.message : ""}</p>

            <div className='addtodoContainer-content'>
                <form className='addContainer-form' action="" method='post' onSubmit={handleSubmit}>
                    <div className='inputContainer'>
                        <input className='form-input' type="text" name='name' value={values.name} onChange={handleChange} placeholder='Name' /> <br />
                        <p className='displayError'>{errors.name ? errors.name : ""}</p>
                    </div>

                    <div>
                        <input className='form-input' type="text" name='description' value={values.description} onChange={handleChange} placeholder='Description(optional)' /> <br />
                    </div>

                    <div className='inputContainer'>
                        <select className='form-input' name="day" id="" value={values.day} onChange={handleChange}>
                            <option value="">Select a day</option>
                            <option value="Sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                        </select><br />
                        <p className='displayError'>{errors.day ? errors.day : ""}</p>

                    </div>

                    <button className='addtodoButton'>Add Todo</button>

                </form>

            </div>

        </div>
    )
}

export default AddTodo