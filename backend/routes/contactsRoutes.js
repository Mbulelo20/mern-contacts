const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact')


router.get('/', (req, res) => {
    Contact.find({user: req.user.id})
    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json({messgae: err}))
});

router.post('/', (req, res) => {
    const { name, email, phone, type} = req.body;

    const newContact = new Contact({
        name, 
        email, 
        phone, 
        type,
        user: req.user.id
    })

    newContact.save()
    .then(() => res.json(newContact))
    .catch(err => res.status(400).json({mesasge: err.message}))
    
});

router.get('/:id', (req, res) => {
    Contact.findById(req.params.id)
    .then((contact) => res.json(contact))
    .catch(err => res.status(400).json({messgae: err}))
});

router.delete('/:id', (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
    .then((contact) => res.json(contact.name + ' removed'))
    .catch(err => res.status(400).json({messgae: err}))
});

router.put('/update/:id', (req, res) => {
    Contact.findById(req.params.id)
    .then((contact) => {
        contact.name = req.body.name;
        contact.phone = req.body.phone;
        contact.email = req.body.email;
        contact.type = req.body.type;
        contact.dste = Date.parse(req.body.dste);

        contact.save()
        .then(() => res.json(contact))
        .catch(err => res.status(400).json({mesasge: err.message}))
    })
    .catch(err => res.status(400).json({mesasge: err}))

    
    
    
});
module.exports = router;