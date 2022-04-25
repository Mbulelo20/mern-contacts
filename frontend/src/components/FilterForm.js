import React, {useState, useEffect} from 'react'

const ContactForm = ({contacts, setContacts }) => {
    const [searchInput, setSearchInput] = useState('')

    const onChange = (e) => {
        setSearchInput(e.target.value) 
        filteredContacts();
    }

    const filteredContacts = () => {
        return contacts.filter(contact => {
        setContacts(contact.name.toLowerCase().includes(this.state.searInput.toLowerCase()))
        })
        }
    
  return (
    <span>
        <input 
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={searchInput || ''}
            placeholder='Enter name'
            onChange={onChange}
            style={{width:'20%'}}
        />
    </span>
  )
}

export default ContactForm