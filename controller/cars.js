const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db('lesson2').collection('cars').find();
        result.toArray().then((cars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars);
    });
    } catch (error) {
        res.status(400).send({message: "There's something wrong getting the list."});
    }
    
};


const findOne = async (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid id.');
    } else {
        try {
            const userId = new ObjectId(req.params.id);
            const result = await mongodb.getDb().db('lesson2').collection('cars').find({ _id: userId });
            result.toArray().then((users) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(users[0]);
            });   
        } catch (error) {
            res.status(400).send({message: "There's something wrong getting the car from ID."});
        }
    }
};

const registerCar = async (req, res) => {
    const car = {
        name: req.body.name,
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        year: req.body.year,
        licensePlate: req.body.licensePlate,
        vin: req.body.vin,
        mileAge: req.body.mileAge,
    };
    try {
        const response = await mongodb.getDb().db('lesson2').collection('cars').insertOne(car);
        if (response.acknowledged) {
            res.status(204).send();
        }
    } catch (error) {
       res.status(400).send({message: "Couldn't register car."}); 
    }
}

const updateCar = async (req, res) => {
    if (!objectId.isValid(req.params.id)) {
       res.status(400).json('Must provide a valid ID'); 
    } else {
        const carId = new ObjectId(req.params.id);
    const car = {
        name: req.body.name,
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        year: req.body.year,
        licensePlate: req.body.licensePlate,
        vin: req.body.vin,
        mileAge: req.body.mileAge,
    };

    const response = await mongodb.getDb().db('lesson2').collection('cars').replaceOne({ _id: carId }, car);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.errorr || 'Some error occured while updating the car');
    }
    }
    
}

const deleteCar = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid contact id.');
    } else {
        const carId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db('lesson2').collection('cars').deleteOne({ _id: carId });
        if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.errorr || 'Some error occured while updating the user');
    }
    }
    

}

module.exports = {getAll, findOne, registerCar, updateCar, deleteCar}