const express = require('express');
const BrandController = require('../controllers/BrandController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Gerenciamento de Marcas
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Retorna a lista de todas as marcas
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Lista de marcas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID da marca
 *                   name:
 *                     type: string
 *                     description: Nome da marca
 *                   website:
 *                     type: string
 *                     description: Website da marca
 *                   logo:
 *                     type: string
 *                     description: Imagem da marca
 *   post:
 *     summary: Cria uma nova marca
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da marca
 *               website:
 *                 type: string
 *                 description: Website da marca
 *               logo:
 *                 type: string
 *                 description: Imagem da marca
 *     responses:
 *       201:
 *         description: Marca criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da nova marca
 *                 name:
 *                   type: string
 *                   description: Nome da nova marca
 *                 website:
 *                   type: string
 *                   description: Website da nova marca
 *                 logo:
 *                   type: string
 *                   description: Imagem da nova marca
 */

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Retorna uma marca específica por ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da marca
 *     responses:
 *       200:
 *         description: Marca encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da marca
 *                 name:
 *                   type: string
 *                   description: Nome da marca
 *                 website:
 *                   type: string
 *                   description: Website da marca
 *                 logo:
 *                   type: string
 *                   description: Imagem da marca
 *       404:
 *         description: Marca não encontrada
 */

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Atualiza uma marca existente por ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da marca a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da marca
 *               website:
 *                 type: string
 *                 description: Website da marca
 *               logo:
 *                 type: string
 *                 description: Imagem da marca
 *     responses:
 *       200:
 *         description: Marca atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID da marca atualizada
 *                 name:
 *                   type: string
 *                   description: Nome da marca atualizada
 *                 website:
 *                   type: string
 *                   description: Website da marca atualizada
 *                 logo:
 *                   type: string
 *                   description: Imagem da marca atualizada
 *       404:
 *         description: Marca não encontrada
 */

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Deleta uma marca por ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da marca a ser deletada
 *     responses:
 *       204:
 *         description: Marca deletada com sucesso
 *       404:
 *         description: Marca não encontrada
 */

router.get('/', BrandController.getAll);
router.get('/:id', BrandController.getOne);
router.post('/', BrandController.create);
router.put('/:id', BrandController.update);
router.delete('/:id', BrandController.delete);

module.exports = router;
