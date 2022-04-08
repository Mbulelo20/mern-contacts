import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {name, email, password} = formData;
    const navigate = useNavigate();
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = {
            email,
            password,
          }
        setFormData(formData)

        axios.post('http://localhost:8000/api/users/login', formData)
        .then((response) => { 
            localStorage.setItem('user', JSON.stringify(response.data))
        })
        .then(() => {navigate('/')})
        .catch((err) => { console.log(err)})
        setFormData({
            email: '',
            password: '',
        })
        

    }
  return (
    <Fragment>
        <section className="heading">
            <p>
                Login
            </p>
        </section>
        <section className="formSection">
            <div className="card">
                <form onSubmit={onSubmit}>
                    <div className="container">
                        <input 
                            type='text'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email || ''}
                            placeholder='Enter your email'
                            onChange={onChange}
                        />
                        <input 
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password || ''}
                            placeholder='Enter password'
                            onChange={onChange} 
                        />
                        <button type="submit" className="registerbtn">Login</button>
                    </div>
                </form>
            </div>
        </section>
    </Fragment>
  )
}

export default Login