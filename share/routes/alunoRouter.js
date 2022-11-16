const express = require ('express');
const AlunoController = require('../controllers/AlunoController');
const router = express.Router();

router.get('/', AlunoController.index);
router.get('/:id', AlunoController.show);
router.post('/', AlunoController.store);
router.put('/:id', AlunoController.update);
router.delete('/:id', AlunoController.delete);

module.exports = router;