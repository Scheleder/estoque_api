const express = require ('express');
const ItemController = require('../controllers/ItemController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Gerenciamento de itens
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retorna a lista de todos os itens
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Lista de itens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do item
 *                   description:
 *                     type: string
 *                     description: Descrição do item
 *                   barcode:
 *                     type: string
 *                     description: Código de barras do item
 *                   adress:
 *                     type: string
 *                     description: Endereço de estoque do item
 *                   quantity:
 *                     type: decimal
 *                     description: Quantidade em estoque do item
 *                   minimum:
 *                     type: decimal
 *                     description: Quantidade minima do item
 */

router.get('/', ItemController.getAll);
router.get('/:id', ItemController.getOne);
router.post('/', ItemController.create);
router.put('/:id', ItemController.update);
router.delete('/:id', ItemController.delete);

module.exports = router;