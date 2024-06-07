const express = require('express');
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
 *   post:
 *     summary: Cria um novo local
 *     tags: [Locals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do local
 *     responses:
 *       201:
 *         description: Local criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do novo local
 *                 name:
 *                   type: string
 *                   description: Nome do local
 */

/**
 * @swagger
 * /locals/{id}:
 *   get:
 *     summary: Retorna um local específico por ID
 *     tags: [Locals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do local
 *     responses:
 *       200:
 *         description: Local encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do local
 *                 name:
 *                   type: string
 *                   description: Nome do local
 *       404:
 *         description: Local não encontrado
 *   put:
 *     summary: Atualiza um local existente por ID
 *     tags: [Locals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do local a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do local
 *     responses:
 *       200:
 *         description: Local atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do local atualizado
 *                 name:
 *                   type: string
 *                   description: Nome do local atualizado
 *       404:
 *         description: Local não encontrado
 *   delete:
 *     summary: Deleta um local por ID
 *     tags: [Locals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do local a ser deletado
 *     responses:
 *       204:
 *         description: Local deletado com sucesso
 *       404:
 *         description: Local não encontrado
 */

router.get('/', LocalController.getAll);
router.get('/:id', LocalController.getOne);
router.post('/', LocalController.create);
router.put('/:id', LocalController.update);
router.delete('/:id', LocalController.delete);

module.exports = router;
