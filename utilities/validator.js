const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
    return [
        //make should not be empty
        body("make")
            .trim()
            .isLength({ min: 3 })
            .withMessage('Please enter a valid car make.'),

            body("model")
            .trim()
            .isLength({ min: 3 })
            .withMessage('Please enter a valid car model.'),

            body("color")
            .trim()
            .isLength({ min: 3 })
            .withMessage('Please enter a valid car color.'),

            body("year")
            .trim()
            .isLength({ min: 3 })
            .withMessage('Please enter a valid car year.'),

            body("licensePlate")
            .trim()
            .isLength({ min: 6 })
            .withMessage('Please enter a valid car licensePlate.'),

            body("vin")
            .trim()
            .isLength({ min: 17 })
            .withMessage('Please enter a valid car vin.'),

            body("mileAge")
            .trim()
            .isNumeric()
            .isLength({ min: 1 })
            .withMessage('Please enter a valid car mileage.'),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()) {
        return next();
    };
    const extractedErrors = {};
    errors.array().forEach((err) => {
        extractedErrors[err.path] = err.msg;
    });
    return res.status(422).json({errors: extractedErrors})
    
}

module.exports = {userValidationRules, validate};