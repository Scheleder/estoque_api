const express = require ('express');
const LocalController = require('../controllers/LocalController');
const router = express.Router();

router.get('/', LocalController.getAll);
router.get('/:id', LocalController.getOne);
router.post('/', LocalController.create);
//router.put('/:id', LocalController.update);
router.delete('/:id', LocalController.delete);

module.exports = router;