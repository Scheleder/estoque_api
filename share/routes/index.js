const express = require('express');
const router = express.Router();
const moment = require('moment');
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

////ROTAS//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const BrandRouter = require('./BrandRouter');
const CategoryRouter = require('./CategoryRouter');
const ItemRouter = require('./ItemRouter');
const LocalRouter = require('./LocalRouter');
const MovementRouter = require('./MovementRouter');
const UserRouter = require('./UserRouter');

////LOG////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.use((req, res, next) => {
  console.log(chalk.magenta('Requisição -> Hora: '+moment().format("MM/DD/YYYY HH:mm:ss"), " && URL -> "+req.path));
  //console.log(chalk.red('IP: '+req.socket.remoteAddress));
  //console.log(req)
  next()
})

////HOME///////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/',function(req,res){return res.send("Página Inicial")});

////REGISTER///////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  if(password !== confirmpassword){
    return res.status(422).json({ msg:"Senhas não conferem!"})
  }
  //CHECK USER
  const userExists = await User.findOne({ where: { email: email } });
  if(userExists){
    return res.status(422).json({ msg:"Este e-mail já está cadastrado!"})
  }

  //CREATE PASSWORD
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  //CREATE USER
  const user = new User({
    name, 
    email,
    password: passwordHash,
  })

  try {
    await user.save()
    return res.status(201).json({msg:"Registrado com sucesso!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar o usuário! Erro:'+error})
  }

})

////LOGIN//////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/auth/login', async(req, res)=>{
  const {email, password } =  req.body
  if(!email){
    return res.status(422).json({ msg:"Informe o e-mail!"})
  }
  if(!password){
    return res.status(422).json({ msg:"Informe a senha!"})
  }

  //CHECK USER
  const user = await User.findOne({ where: { email: email } });
  if(!user){
    return res.status(404).json({ msg:"Este e-mail não está cadastrado!"})
  }

 //CHECK PASSWORD
  const checkPassword = await bcrypt.compare(password, user.password)

  if(!checkPassword){
    return res.status(422).json({msg: 'A senha não confere!'})
  }
  
  try {
    const secret = process.env.APP_SECRET
    const token = jwt.sign({ id: user.id }, secret )  
    return res.status(200).json({msg:"Logado com sucesso!", token, user:{id:user.id, name:user.name, email:user.email}})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar o usuário! Erro:'+error})
  }

})

////CHECK TOKEN////////////////////////////////////////////////////////////////////////////////////////////////////////
checkToken = function(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(!token){
    return res.status(401).json({msg: 'Acesso negado!'})
  }
  try {
    const secret = process.env.APP_SECRET
    jwt.verify(token, secret)
    next()
  } catch (error) {
    console.log(error)
    return res.status(400).json({msg: 'Token inválido! Erro:'+error})
  }
}

////PRIVATE ROUTES/////////////////////////////////////////////////////////////////////////////////////////////////////
router.use('/brands', checkToken, BrandRouter);
router.use('/categories', checkToken, CategoryRouter);
router.use('/items', checkToken, ItemRouter);
router.use('/locals', checkToken, LocalRouter);
router.use('/movements', checkToken, MovementRouter);
router.use('/users', checkToken, UserRouter);

module.exports = router;