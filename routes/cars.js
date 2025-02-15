const router = require('express').Router();
const carController = require('../controller/cars');
const validation = require('../utilities/validator');
const { isAuthenticated } = require('../utilities/authenticate');

router.get('/', carController.getAll);

router.get('/:id', carController.findOne);

router.post('/', isAuthenticated, validation.userValidationRules(), validation.validate, carController.registerCar);

router.put('/:id', isAuthenticated, validation.userValidationRules(), validation.validate, carController.updateCar);

router.delete('/:id', isAuthenticated, carController.deleteCar);
 

module.exports = router;