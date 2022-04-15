import React, { useEffect} from 'react';
import ContactForm from './ContactForm';
import Aos from 'aos';
import 'aos/dist/aos.css';

const ContactFormModal = ({setShowModal, setContactID, showModal, contactID}) => {
  
    useEffect(() => {
        Aos.init({duration: 1000});
    })

  return (
    <div data-aos={showModal ? 'slide-down' : 'slide-up'} className="modal-content">
        <div className="modal-body">

        <h1 style={{textAlign: 'center'}}>{contactID ? 'Edit Contact' : 'Add Contact'}</h1>
            <ContactForm setShowModal={setShowModal} setContactID={setContactID} contactID={contactID}/>
        </div>
        
    </div>
  )
}

export default ContactFormModal