const express = require ('express');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retorna a lista de todos as categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do categoria
 *                   name:
 *                     type: string
 *                     description: Nome da categoria
 */

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getOne);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

module.exports = router;