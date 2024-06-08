const express = require('express');
const ComponentController = require('../controllers/ComponentController');
const router = express.Router();

router.get('/', ComponentController.getAll);
router.get('/:id', ComponentController.getOne);
router.post('/', ComponentController.create);
router.put('/:id', ComponentController.update);
router.delete('/:id', ComponentController.delete);

module.exports = router;