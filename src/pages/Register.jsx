import React, { Fragment, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', 
        email: '',
        password: '',
        password2: ''
    })
    const {name, email, password, password2} = formData;
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '' || name === '') {
            toast.error('Please fill in all fields');
          } 
        if(password!== password2) {
            toast.error('Passwords do not match', 'danger');
        } else {
            const formData = {
                name,
                email,
                password,
            }
            setFormData(formData)
            axios.post('http://localhost:8000/api/users', formData)
            .then((response) => { 
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/')
            })
            .catch( () => { toast.error('Email already in use')})
        }
    }
  return (
    <Fragment>
        <section className="heading">
            <p>
                Register
            </p>
        </section>
        <section className="formSection">
            <div className="card">
                <form onSubmit={onSubmit}>
                    <div className="container">
                        
                        <input type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            value={name || ''}
                            placeholder='Enter your name'
                            onChange={onChange} 
                        />
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
                        <input 
                            type='password'
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2 || ''}
                            placeholder='Confirm password'
                            onChange={onChange}
                        />
                        <button type="submit" className="registerbtn">Register</button>
                    </div>
                    <div className="container signin">
                        <p>Already have an account? <Link to='/login'>Sign in</Link>.</p>
                    </div>
                </form>
            </div>
        </section>
    </Fragment>
  )
}

export default Register