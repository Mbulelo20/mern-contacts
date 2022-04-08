import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
    const [contacts, setContacts] = useState([])
    const [user, setUser] = useState('')
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        phone:'',
        type: 'personal',
    })
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            setUser(user)
        }
        if(user === null) {
            navigate('/login')
        }
        const token = user.token

        axios.get('http://localhost:8000/api/contacts/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setContacts(res.data)
        })
        .catch((err) => console.log("err", err))
    }, [])
    return (
        <div style={style}>

            <div style={userStyle}>
                {contacts.map((contact) => (
                    <div className='card bg-light' style={{ height:'150px'}}>
                        <h3 className="text-primary text-left" style={{color:'#A92244'}}>{contact.name}
                        <span className="badge badge-primary " style={{float: 'right'}}>{contact.type}</span>
                        </h3>
                        <ul className="list">
                            <li>
                            <h4><FontAwesomeIcon icon={faEnvelope}/> {contact.email}</h4>
                            </li>
                            <li style={{marginTop: '-1em'}}>
                            <h4><FontAwesomeIcon icon={faPhone}/> {contact.phone}</h4>
                            </li>
                        </ul>
                        <p style={{marginTop:'-1em'}}>
                            <button
                            className='btn btn-dark btn-sm'
                            onClick={() => {}}
                            >
                            Edit
                            </button>
                            <button className='btn btn-danger btn-sm' onClick={() => {}}>
                            Delete
                            </button>
                        </p>
                    </div>
                ))}
            </div>
            <div style={{width:'70%', margin: 'auto'}}>
            <form style={{marginTop: '2em'}}>
                    <div className="container">
                        <input 
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            // value={name || ''}
                            placeholder='Enter name'
                            // onChange={onChange}
                        />
                        <input 
                            style={{marginTop: '-1em'}}
                            type='text'
                            className='form-control'
                            id='email'
                            name='email'
                            // value={email || ''}
                            placeholder='Enter email'
                            // onChange={onChange} 
                        />
                        <input 
                        style={{marginTop: '-1em'}}
                            type='text'
                            className='form-control'
                            id='phone'
                            name='phone'
                            // value={phone || ''}
                            placeholder='Enter phone'
                            // onChange={onChange} 
                        />
                        <h5>Contact Type</h5>
                        <input
                            type='radio'
                            name='type'
                            value='personal'
                            // onChange={onChange}
                        />{' '}
                        Personal{' '}
                        <input
                            type='radio'
                            name='type'
                            value='professional'
                            // onChange={onChange}
                        />{' '}
                        Professional
                        <button type="submit" className="registerbtn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const userStyle ={
    minWidth:'100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridColumnGap: '1em',
    marginTop: '5em', 
  }

const style ={
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',

}
export default Dashboard