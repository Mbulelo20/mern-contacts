const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact')
const UserModel = require('../models/userModel')

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, (req, res) => {
    Contact.find({user: req.user.id})
    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json({messgae: err}))
});

router.post('/', protect, (req, res) => {
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

router.get('/:id', protect, (req, res) => {
    Contact.findById(req.params.id)
    .then((contact) => res.json(contact))
    .catch(err => res.status(400).json({messgae: err}))
});

router.delete('/:id', protect, async (req, res) => {
    const contact = await Contact.findById(req.params.id)

    if(!contact) {
        res.status(400);
        throw new Error("File not found!");
    }

    if(!req.user) {
        res.status(401);
        throw new Error("User not found")
    }

    if(contact.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized")
    }
    await contact.remove();
    res.status(200).json({id: req.params.id})
});

router.put('/update/:id', protect, async(req, res) => {
    const contact = await Contact.findById(req.params.id)

    if(!contact) {
        res.status(400);
        throw new Error("Contact not found!");
    }

    const user = await UserModel.findById(req.user.id)
    if(!user) {
        res.status(401);
        throw new Error("User not found")
    }
 
    //check if loggedIn user maatches contact's user(i.e owner)
    if(contact.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized")
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
    
    res.status(200).json(updatedContact)

    
});
module.exports = router;