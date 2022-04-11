import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const ContactForm = ({setShowModal}) => {
    const [user, setUser] = useState('');
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        phone:'',
        type: 'personal',
    })
    const {name, email, phone, type} = contactData
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            setUser(user)
        }
        if(user === null) {
            navigate('/login')
        }
    }, [])
    const onChange = (e) => {
        setContactData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const contactData = {
            name, email, phone, type
        }

        axios.post('http://localhost:8000/api/contacts', contactData, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        .then((response) => { console.log(response.data)})
        .then(() => setShowModal(false))
        .catch((err) => { console.log("error:", err)})
    }
  return (
    <div style={{width:'100%'}}>
        <form style={{marginTop: '0em'}} onSubmit={onSubmit}>
            <div className="container">
                <input 
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    value={name || ''}
                    placeholder='Enter name'
                    onChange={onChange}
                />
                <input 
                    style={{marginTop: '-1em'}}
                    type='text'
                    className='form-control'
                    id='email'
                    name='email'
                    value={email || ''}
                    placeholder='Enter email'
                    onChange={onChange} 
                />
                <input 
                style={{marginTop: '-1em'}}
                    type='text'
                    className='form-control'
                    id='phone'
                    name='phone'
                    value={phone || ''}
                    placeholder='Enter phone'
                    onChange={onChange} 
                />
                <h5>Contact Type</h5>
                <input
                    type='radio'
                    name='type'
                    value='personal'
                    onChange={onChange}
                />{' '}
                Personal{' '}
                <input
                    type='radio'
                    name='type'
                    value='professional'
                    onChange={onChange}
                />{' '}
                Professional
                <button type="submit" style={{backgroundColor: '#dc3545'}} className="registerbtn">Save</button>
            </div>
        </form>
    </div>
  )
}

export default ContactForm