const express = require ('express');
const BrandController = require('../controllers/BrandController');
const router = express.Router();

router.get('/', BrandController.getAll);
router.get('/:id', BrandController.getOne);
router.post('/', BrandController.create);
//router.put('/:id', BrandController.update);
//router.delete('/:id', BrandController.delete);

module.exports = router;