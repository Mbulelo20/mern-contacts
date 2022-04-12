import React, {useState, useEffect} from 'react';
import ContactForm from './ContactForm';
import Aos from 'aos';
import 'aos/dist/aos.css';

const ContactFormModal = ({setShowModal, contactID}) => {
  
    useEffect(() => {
        Aos.init({duration: 1000});
    })

  return (
    <div data-aos='fade-up' className="modal-content">
        <div className="modal-body">

        <h1 style={{textAlign: 'center'}}>{contactID ? 'Edit Contact' : 'Add Contact'}</h1>
            <ContactForm setShowModal={setShowModal} contactID={contactID}/>
        </div>
        
    </div>
  )
}

export default ContactFormModal