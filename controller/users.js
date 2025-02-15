const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db('lesson2').collection('users').find(); // Add collection name
        const users = await result.toArray(); // Convert to array
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('lesson2').collection('users').findOne({ _id: userId }); // Use `findOne` for single user
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching the user.' });
    }
};

const createUser = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDb().db('lesson2').collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(201).json({ message: 'User created successfully.', id: response.insertedId });
        } else {
            res.status(500).json({ error: 'An error occurred while creating the user.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDb().db('lesson2').collection('users').replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'User updated successfully.' });
        } else {
            res.status(404).json({ error: 'User not found or no changes made.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db('lesson2').collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'User deleted successfully.' });
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
