const express = require ('express');
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
 *     summary: Retorna a lista de todos as marcas
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
 */

router.get('/', BrandController.getAll);
router.get('/:id', BrandController.getOne);
router.post('/', BrandController.create);
router.put('/:id', BrandController.update);
router.delete('/:id', BrandController.delete);

module.exports = router;