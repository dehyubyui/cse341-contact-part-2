const swaggerUI = require('swagger-ui-express');
const swaggerDocumentation = require('../swagger.json')
const router = require('express').Router();

router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDocumentation));


module.exports = router;