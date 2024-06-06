const express = require ('express');
const MovementController = require('../controllers/MovementController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movements
 *   description: Gerenciamento de movimentações de estoque
 */

/**
 * @swagger
 * /moviments:
 *   get:
 *     summary: Retorna a lista de todos as movimentações
 *     tags: [Movements]
 *     responses:
 *       200:
 *         description: Lista de movimentações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID da movimentação
 *                   type:
 *                     type: string
 *                     description: Tipo de movimentação
 *                   destination:
 *                     type: string
 *                     description: Destino ou documento
 *                   quantity:
 *                     type: decimal
 *                     description: Quantidade da movimentação
 */
router.get('/', MovementController.getAll);
router.get('/:id', MovementController.getOne);
router.post('/', MovementController.create);
router.put('/:id', MovementController.update);
router.delete('/:id', MovementController.delete);

module.exports = router;