const express = require ('express');
const CursoController = require('../controllers/CursoController');
const router = express.Router();

router.get('/', CursoController.index);
router.get('/:id', CursoController.show);
router.post('/', CursoController.store);
router.put('/:id', CursoController.update);
router.delete('/:id', CursoController.delete);

module.exports = router;