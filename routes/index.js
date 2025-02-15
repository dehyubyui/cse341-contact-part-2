const express = require('express');
const router = express.Router();
const controllerIndex = require('../controller/index.js');
const passport = require('passport');

router.use('/', require('./swagger'));

router.use('/cars', require('./cars'));

router.use('/users', require('./users.js'));

router.get('/login', passport.authenticate('github'), (req,res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/')
    });
});


module.exports = router;