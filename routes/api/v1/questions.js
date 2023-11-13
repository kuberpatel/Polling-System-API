const express = require('express');
const router = express.Router();
const questionController = require('../../../controllers/api/v1/questionController');

router.post('/create', questionController.create);
router.get('/:id/delete', questionController.delete);
router.post('/:id/options/create', questionController.optionCreate);
router.get('/:id', questionController.home);

module.exports = router;