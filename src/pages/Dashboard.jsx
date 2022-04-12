import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhone, faPlus } from '@fortawesome/free-solid-svg-icons'
import ContactFormModal from '../components/ContactFormModal'
import 'aos/dist/aos.css';
import Aos from 'aos';


const Dashboard = () => {
    const [contacts, setContacts] = useState([])
    const [user, setUser] = useState('')
    const [contactID, setContactID] = useState('')
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        Aos.init({duration: 1000});
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
            setContacts(res.data.sort((b, a) => {
                return a.date < b.date ? -1 : (a.date > b.date ? 1 : 0);
            }))
        })
        .catch((err) => console.log("err", err))
    }, [contacts])

    const setModal = () => {
        if(!showModal){
            setShowModal(true)
        } else {
            setShowModal(false)
            setContactID('')
        }
    }

    const deleteContact = (contact) => {
        console.log(contact._id)
        axios.delete(`http://localhost:8000/api/contacts/${contact._id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        .then((res) => {console.log(res)})
        .catch((err) => {console.log(err)})
    }
    return (
        <>
            <div style={{margin: 'auto',  marginBottom:'2em'}}>
                <span>
                    <button className='btn btn-danger' onClick={() => setModal()}>
                        {showModal ? 'Back' : 'Add'}
                    </button>
                    </span>
                <span>
                <button
                    className='btn btn-dark'
                    onClick={() => {}}
                    >
                    Search
                    </button>
                </span>
            </div>
            {showModal === true && <div data-aos='fade-down'><ContactFormModal contactID={contactID} setShowModal={setShowModal}/></div>}
            {contacts.length < 1 && <h1>No contacts found</h1> }
            <div style={userStyle}>
                {contacts.map((contact) => (
                    <div className='card bg-light' style={{ height:'150px'}} key={contact._id}>
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
                            onClick={() => {
                                setContactID(contact._id)
                                setShowModal(true)
                            }}
                            >
                            Edit
                            </button>
                            <button className='btn btn-danger btn-sm' onClick={() => {deleteContact(contact)}}>
                            Delete
                            </button>
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

// axios.delete(`http://localhost:8000/api/contacts/${contactID}`, {
//                                     headers: {
//                                         Authorization: `Bearer ${user.token}`
//                                     }
//                                 })
//                                 .then((res) => {console.log(res)})
//                                 .catch((err) => {console.log(err)})
//                                 }

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridColumnGap: '1em',
    marginTop: '5em', 
    margin: 'auto'
  }
export default Dashboard