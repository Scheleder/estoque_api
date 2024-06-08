const express = require('express');
const ComponentController = require('../controllers/ComponentController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Components
 *   description: Gerenciamento de Componentes
 */

/**
 * @swagger
 * /components:
 *   get:
 *     summary: Retorna a lista de todos os componentes
 *     tags: [Components]
 *     responses:
 *       200:
 *         description: Lista de componentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               componentes:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do componente
 *                   description:
 *                     type: string
 *                     description: Descrição do componente
 *                   barcode:
 *                     type: string
 *                     description: Código de barras do componente
 *                   sku:
 *                     type: string
 *                     description: Código SKU do componente
 *   post:
 *     summary: Cria um novo componente
 *     tags: [Components]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descrição do componente
 *               barcode:
 *                 type: string
 *                 description: Código de barras do componente
 *               sku:
 *                 type: string
 *                 description: Código SKU do componente
 *     responses:
 *       201:
 *         description: Componente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do novo componente
 *                 description:
 *                   type: string
 *                   description: Descrição do componente
 *                 barcode:
 *                   type: string
 *                   description: Código de barras do componente
 *                 sku:
 *                   type: string
 *                   description: Código SKU do componente
 *  */
/**
 * @swagger
 * /components/{id}:
 *   get:
 *     summary: Retorna um componente específico por ID
 *     tags: [Components]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do componente
 *     responses:
 *       200:
 *         description: Componente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do componente
 *                 description:
 *                   type: string
 *                   description: Descrição do componente
 *                 barcode:
 *                   type: string
 *                   description: Código de barras do componente
 *                 sku:
 *                   type: string
 *                   description: Código SKU do componente
 *       404:
 *         description: Componente não encontrado
 */

/**
 * @swagger
 * /components/{id}:
 *   put:
 *     summary: Atualiza um componente existente por ID
 *     tags: [Components]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do componente a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descrição do componente
 *               barcode:
 *                 type: string
 *                 description: Código de barras do componente
 *               sku:
 *                 type: string
 *                 description: Código SKU do componente
 *     responses:
 *       200:
 *         description: Component atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do componente atualizado
 *                 description:
 *                   type: string
 *                   description: Descrição do componente atualizado
 *                 barcode:
 *                   type: string
 *                   description: Código de barras do componente atualizado
 *                 sku:
 *                   type: string
 *                   description: Código SKU do componente atualizado
 *       404:
 *         description: Componente não encontrado
 *   delete:
 *     summary: Deleta um componente por ID
 *     tags: [Components]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do componente a ser deletado
 *     responses:
 *       204:
 *         description: Componente deletado com sucesso
 *       404:
 *         description: Componente não encontrado
 */

router.get('/', ComponentController.getAll);
router.get('/:id', ComponentController.getOne);
router.post('/', ComponentController.create);
router.put('/:id', ComponentController.update);
router.delete('/:id', ComponentController.delete);

module.exports = router;
