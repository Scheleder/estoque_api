const express = require('express');
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
 * /movements:
 *   get:
 *     summary: Retorna a lista de todas as movimentações
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
 *                     description: Destino ou documento associado
 *                   quantity:
 *                     type: number
 *                     format: float
 *                     description: Quantidade da movimentação
 *   post:
 *     summary: Cria uma nova movimentação de estoque
 *     tags: [Movements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - destination
 *               - quantity
 *             properties:
 *               type:
 *                 type: string
 *                 description: Tipo de movimentação (por exemplo, entrada, saída)
 *               destination:
 *                 type: string
 *                 description: Destino ou documento associado à movimentação
 *               quantity:
 *                 type: number
 *                 format: float
 *                 description: Quantidade da movimentação
 *     responses:
 *       201:
 *         description: Movimentação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da nova movimentação
 *                 type:
 *                   type: string
 *                   description: Tipo de movimentação
 *                 destination:
 *                   type: string
 *                   description: Destino ou documento associado
 *                 quantity:
 *                   type: number
 *                   format: float
 *                   description: Quantidade da movimentação
 */

/**
 * @swagger
 * /movements/{id}:
 *   get:
 *     summary: Retorna uma movimentação específica por ID
 *     tags: [Movements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da movimentação
 *     responses:
 *       200:
 *         description: Movimentação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da movimentação
 *                 type:
 *                   type: string
 *                   description: Tipo de movimentação
 *                 destination:
 *                   type: string
 *                   description: Destino ou documento associado
 *                 quantity:
 *                   type: number
 *                   format: float
 *                   description: Quantidade da movimentação
 *       404:
 *         description: Movimentação não encontrada
 *   put:
 *     summary: Atualiza uma movimentação existente por ID
 *     tags: [Movements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da movimentação a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - destination
 *               - quantity
 *             properties:
 *               type:
 *                 type: string
 *                 description: Tipo de movimentação (por exemplo, entrada, saída)
 *               destination:
 *                 type: string
 *                 description: Destino ou documento associado à movimentação
 *               quantity:
 *                 type: number
 *                 format: float
 *                 description: Quantidade da movimentação
 *     responses:
 *       200:
 *         description: Movimentação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da movimentação atualizada
 *                 type:
 *                   type: string
 *                   description: Tipo de movimentação
 *                 destination:
 *                   type: string
 *                   description: Destino ou documento associado
 *                 quantity:
 *                   type: number
 *                   format: float
 *                   description: Quantidade da movimentação
 *       404:
 *         description: Movimentação não encontrada
 *   delete:
 *     summary: Deleta uma movimentação por ID
 *     tags: [Movements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da movimentação a ser deletada
 *     responses:
 *       204:
 *         description: Movimentação deletada com sucesso
 *       404:
 *         description: Movimentação não encontrada
 */

router.get('/', MovementController.getAll);
router.get('/:id', MovementController.getOne);
router.post('/', MovementController.create);
router.put('/:id', MovementController.update);
router.delete('/:id', MovementController.delete);

module.exports = router;
