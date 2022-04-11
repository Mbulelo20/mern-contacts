import React, {useState, useEffect} from 'react';
import ContactForm from './ContactForm';
import Aos from 'aos';
import 'aos/dist/aos.css';

const ContactFormModal = ({setShowModal}) => {
  
    useEffect(() => {
        Aos.init({duration: 1000});
    })

  return (
    <div data-aos='fade-up' className="modal-content">
        <div class="modal-body">

        <h1 style={{textAlign: 'center'}}>Add Contact</h1>
            <ContactForm setShowModal={setShowModal}/>
        </div>
        
    </div>
  )
}

export default ContactFormModal