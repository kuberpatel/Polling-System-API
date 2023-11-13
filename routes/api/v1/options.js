const express = require('express');
const router = express.Router();
const optionController = require('../../../controllers/api/v1/optionsController')

router.get('/:id/delete', optionController.delete);
router.get('/:id/add_vote', optionController.add_vote);
router.get('/:id/down_vote', optionController.down_vote);

module.exports = router;