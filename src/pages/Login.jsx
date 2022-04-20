import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData;
    const navigate = useNavigate();
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = async(e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            toast.error('Please fill in all fields');
          } else {
            const formData = {
                email,
                password,
              }
            setFormData(formData)
          }
        

        try {
           const response = await axios.post('http://localhost:8000/api/users/login', formData);
           localStorage.setItem('user', JSON.stringify(response.data))
            navigate('/')
        } catch(error) {
           toast.error("Error: Invalid Credentials", error.message)
        }
        // axios.post('http://localhost:8000/api/users/login', formData)
        // .then((response) => { 
        //     localStorage.setItem('user', JSON.stringify(response.data))
        //     navigate('/')
        // })
        // // .then(() => {navigate('/')})
        // .catch((error) => console.log(error))
        // setFormData({
        //     email: '',
        //     password: '',
        // })
        

    }
  return (
    <Fragment>
        <section className="heading">
            <p>
                Login
            </p>
        </section>
        <section className="formSection">
            <div className="card" style={{width: '70%', margin:'auto'}}>
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