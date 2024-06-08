const express = require('express');
const UnityController = require('../controllers/UnityController');
const router = express.Router();

router.get('/', UnityController.getAll);
router.get('/:id', UnityController.getOne);
router.post('/', UnityController.create);
router.put('/:id', UnityController.update);
router.delete('/:id', UnityController.delete);

module.exports = router;