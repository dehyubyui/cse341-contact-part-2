const express = require('express');
const router = express.Router();

const usersController = require('../controller/users');
const userValidation = require('../utilities/userValidator');
const { isAuthenticated } = require('../utilities/authenticate');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', isAuthenticated, userValidation.userValidationRules(), userValidation.validate, usersController.createUser);

router.put('/:id',isAuthenticated ,userValidation.userValidationRules(), userValidation.validate, usersController.updateUser);

router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;