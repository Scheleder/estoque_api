const express = require('express');
const ItemController = require('../controllers/ItemController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Gerenciamento de Itens
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
 *                   address:
 *                     type: string
 *                     description: Endereço de estoque do item
 *                   quantity:
 *                     type: number
 *                     format: float
 *                     description: Quantidade em estoque do item
 *                   minimum:
 *                     type: number
 *                     format: float
 *                     description: Quantidade mínima do item
 *   post:
 *     summary: Cria um novo item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - barcode
 *               - address
 *               - quantity
 *               - minimum
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descrição do item
 *               barcode:
 *                 type: string
 *                 description: Código de barras do item
 *               address:
 *                 type: string
 *                 description: Endereço de estoque do item
 *               quantity:
 *                 type: number
 *                 format: float
 *                 description: Quantidade em estoque do item
 *               minimum:
 *                 type: number
 *                 format: float
 *                 description: Quantidade mínima do item
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do novo item
 *                 description:
 *                   type: string
 *                   description: Descrição do item
 *                 barcode:
 *                   type: string
 *                   description: Código de barras do item
 *                 address:
 *                   type: string
 *                   description: Endereço de estoque do item
 *                 quantity:
 *                   type: number
 *                   format: float
 *                   description: Quantidade em estoque do item
 *                 minimum:
 *                   type: number
 *                   format: float
 *                   description: Quantidade mínima do item
 */

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Retorna um item específico por ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do item
 *                 description:
 *                   type: string
 *                   description: Descrição do item
 *                 barcode:
 *                   type: string
 *                   description: Código de barras do item
 *                 address:
 *                   type: string
 *                   description: Endereço de estoque do item
 *                 quantity:
 *                   type: number
 *                   format: float
 *                   description: Quantidade em estoque do item
 *                 minimum:
 *                   type: number
 *                   format: float
 *                   description: Quantidade mínima do item
 *       404:
 *         description: Item não encontrado
 */

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Atualiza um item existente por ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descrição do item
 *               barcode:
 *                 type: string
 *                 description: Código de barras do item
 *               address:
 *                 type: string
 *                 description: Endereço de estoque do item
 *               quantity:
 *                 type: number
 *                 format: float
 *                 description: Quantidade em estoque do item
 *               minimum:
 *                 type: number
 *                 format: float
 *                 description: Quantidade mínima do item
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do item atualizado
 *                 description:
 *                   type: string
 *                   description: Descrição do item atualizado
 *                 barcode:
 *                   type: string
 *                   description: Código de barras do item atualizado
 *                 address:
 *                   type: string
 *                   description: Endereço de estoque do item atualizado
 *                 quantity:
 *                   type: number
 *                   format: float
 *                   description: Quantidade em estoque do item atualizado
 *                 minimum:
 *                   type: number
 *                   format: float
 *                   description: Quantidade mínima do item atualizado
 *       404:
 *         description: Item não encontrado
 */

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Deleta um item por ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item a ser deletado
 *     responses:
 *       204:
 *         description: Item deletado com sucesso
 *       404:
 *         description: Item não encontrado
 */

router.get('/', ItemController.getAll);
router.get('/:id', ItemController.getOne);
router.post('/', ItemController.create);
router.put('/:id', ItemController.update);
router.delete('/:id', ItemController.delete);

module.exports = router;
