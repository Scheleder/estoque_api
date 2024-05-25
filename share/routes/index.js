const express = require('express');
const router = express.Router();
const moment = require('moment');
const chalk = require('chalk');

//MODELS
//const User = require('.share/models/User')

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log(chalk.magenta('Requisição -> Hora: '+moment().format("MM/DD/YYYY HH:mm:ss"), " && URL -> "+req.path));
    next()
  })

//HOME
router.get('/',function(req,res){return res.send("Página Inicial")});

//REGISTER
router.post('/auth/register', async(req, res)=>{
  const {name, email, password, confirmpassword} =  req.body
  if(!name){
    return res.status(422).json({ msg:"Nome é obrigatório!"})
  }
  if(!email){
    return res.status(422).json({ msg:"E-mail é obrigatório!"})
  }
  if(!password){
    return res.status(422).json({ msg:"Senha é obrigatória!"})
  }
})

//ITEMS
router.get('/items',function(req,res){return res.send("Todos os Itens")})
router.get('/item/:id',function(req,res){return res.send("Item "+ req.params.id)})
//MOVEMENTS
router.get('/movements',function(req,res){return res.send("Todas as Movimentações")})
router.get('/movement/:id',function(req,res){return res.send("Movimento "+ req.params.id)})
//USERS
router.get('/users',function(req,res){return res.send("Todos os Usuários")})
router.get('/user/:id',function(req,res){return res.send("Usuário "+ req.params.id)})
//BRANDS
router.get('/brands',function(req,res){return res.send("Todos os Fabricantes")})
router.get('/brand/:id',function(req,res){return res.send("Fabricante "+ req.params.id)})

module.exports = router;