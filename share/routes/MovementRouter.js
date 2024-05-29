const express = require ('express');
const MovementController = require('../controllers/MovementController');
const router = express.Router();

router.get('/', MovementController.getAll);
router.get('/:id', MovementController.getOne);
router.post('/', MovementController.create);
//router.put('/:id', MovementController.update);
router.delete('/:id', MovementController.delete);

module.exports = router;