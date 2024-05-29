const express = require ('express');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getOne);
router.post('/', CategoryController.create);
//router.put('/:id', CategoryController.update);
//router.delete('/:id', CategoryController.delete);

module.exports = router;