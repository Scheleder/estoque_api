const express = require ('express');
const LocalController = require('../controllers/LocalController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Locals
 *   description: Gerenciamento de locais
 */

/**
 * @swagger
 * /locals:
 *   get:
 *     summary: Retorna a lista de todos os locais
 *     tags: [Locals]
 *     responses:
 *       200:
 *         description: Lista de locais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do local
 *                   name:
 *                     type: string
 *                     description: Nome do local
 */

router.get('/', LocalController.getAll);
router.get('/:id', LocalController.getOne);
router.post('/', LocalController.create);
router.put('/:id', LocalController.update);
router.delete('/:id', LocalController.delete);

module.exports = router;