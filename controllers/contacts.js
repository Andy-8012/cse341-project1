const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //swagger.tags=['Contacts']
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
}

const getById = async (req, res) => {
    //swagger.tags=['Contacts']
    const contactsID = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactsID });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
}

const createContact = async (req, res) => {
    //swagger.tags=['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json({
            message: 'Created new contact.',
            contact: { id: response.insertedId, ...contact }
        });
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the contact.')
    }
}

const updateContact = async (req, res) => {
    //swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
        res.status(200).json({
            message: 'Successfully updated contact',
            updatedContact: { id: contactId, ...contact }
        });

    } else {
        res.status(500).json(response.error || 'Some error occured while updating the contact.')
    }
}

const deleteContact = async (req, res) => {
    //swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
        res.status(200).json({
            message: 'Deleted contact.',
            deletedId: contactId
        });

    } else {
        res.status(500).json(response.error || 'Some error occured while updating the contact.')
    }
}

module.exports = {
    getAll,
    getById,
    createContact,
    updateContact,
    deleteContact
}