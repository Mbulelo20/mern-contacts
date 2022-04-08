import React,{useEffect, useState} from 'react';

const ContactCard = (contact) => {
  useEffect(() => {
   
    console.log("co:", contact)
  }, [contact])
    

  return (
    
    <h1>hi</h1>
  );
}

export default ContactCard