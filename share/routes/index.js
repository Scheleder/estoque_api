const express = require('express');
const router = express.Router();
const moment = require('moment');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');

////ROTAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const AuthRouter = require('./AuthRouter');
const BrandRouter = require('./BrandRouter');
const CategoryRouter = require('./CategoryRouter');
const ComponentRouter = require('./ComponentRouter');
const ItemRouter = require('./ItemRouter');
const LocalRouter = require('./LocalRouter');
const MovementRouter = require('./MovementRouter');
const UserRouter = require('./UserRouter');
const UnityRouter = require('./UnityRouter');

////LOG////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.use((req, res, next) => {
  console.log(chalk.magenta('Requisição -> Hora: ' + moment().format("MM/DD/YYYY HH:mm:ss"), " && URL -> " + req.path));
  next()
})

////HOME///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//router.get('/',function(req,res){return res.send("Página Inicial")});
router.get('/', function (req, res) { res.redirect('/api-docs') });

////AUTH//////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.use('/auth', AuthRouter);

////CHECK TOKEN////////////////////////////////////////////////////////////////////////////////////////////////////////
checkToken = function (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado!' })
  }
  try {
    const secret = process.env.APP_SECRET
    jwt.verify(token, secret)
    next()
  } catch (error) {
    console.log(error)
    return res.status(400).json({ msg: 'Token inválido! Erro:' + error })
  }
}

////PRIVATE ROUTES/////////////////////////////////////////////////////////////////////////////////////////////////////
router.use('/brands', checkToken, BrandRouter);
router.use('/categories', checkToken, CategoryRouter);
router.use('/items', checkToken, ItemRouter);
router.use('/locals', checkToken, LocalRouter);
router.use('/movements', checkToken, MovementRouter);
router.use('/users', checkToken, UserRouter);
router.use('/units', checkToken, UnityRouter);
router.use('/components', checkToken, ComponentRouter);

module.exports = router;