const express = require('express');
const router = express.Router();
const moment = require('moment');
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//////////////////////////////////////////////////////////////////////////////////////////////////////////IMPORT MODELS
const User = require('../models/User')
const Brand = require('../models/Brand')
const Local = require('../models/Local')
const Item = require('../models/Item')
const Movement = require('../models/Movement')

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log(chalk.magenta('Requisição -> Hora: '+moment().format("MM/DD/YYYY HH:mm:ss"), " && URL -> "+req.path));
    next()
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////HOME
router.get('/',function(req,res){return res.send("Página Inicial")});

//////////////////////////////////////////////////////////////////////////////////////////////////////////REGISTER
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////LOGIN
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
      // Criar uma cópia do objeto user sem o campo 'password'
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;  
    return res.status(200).json({msg:"Logado com sucesso!", token, user:userWithoutPassword})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar o usuário! Erro:'+error})
  }

})


//////////////////////////////////////////////////////////////////////////////////////////////////////////PRIVATE ROUTES


//////////////////////////////////////////////////////////////////////////////////////////////////////////USERS

router.get('/users',async function(req, res){
  const users = await User.findAll({
    attributes: { exclude: ['password'] } // Exclui o campo 'password'
  })
  if(users.length == 0){
    return res.status(204).json({ msg:"Nenhum usuário cadastrado!" })
  }
  return res.send(users)
})

router.get('/user/:id', async (req, res) => {
  const id = req.params.id
  //check user
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] } // Exclui o campo 'password'
  })
  if(!user){
    return res.status(404).json({ msg:"Usuário não encontrado!" })
  }
   res.status(200).json({user})
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////BRANDS

router.post('/brand/new', async(req, res)=>{
  const {name, website, logo} =  req.body
  if(!name){
    return res.status(422).json({ msg:"Nome é obrigatório!"})
  }

  //CHECK BRAND
  const brandExists = await Brand.findOne({ where: { name: name } });
  if(brandExists){
    return res.status(422).json({ msg:"Este Fabricante já está cadastrado!"})
  }

  //CREATE BRAND
  const brand = new Brand({
    name, 
    website,
    logo,
  })

  try {
    await brand.save()
    return res.status(201).json({msg:"Novo Fabricante adicionado com sucesso!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar o fabricante! Erro:'+error})
  }
})

router.get('/brands',async function(req, res){
  const brands = await Brand.findAll()
  if(brands.length == 0){
    return res.status(204).json({ msg:"Nenhum Fabricante cadastrado!" })
  }
  return res.send(brands)
})

router.get('/brand/:id', async (req, res) => {
  const id = req.params.id
  const brand = await Brand.findByPk(id)
  if(!brand){
    return res.status(404).json({ msg:"Fabricante não encontrado!"})
  }
   res.status(200).json({brand})
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////LOCALS

router.post('/local/new', async(req, res)=>{
  const {name} =  req.body
  if(!name){
    return res.status(422).json({ msg:"Nome é obrigatório!"})
  }

  //CHECK LOCAL
  const localExists = await Local.findOne({ where: { name: name } });
  if(localExists){
    return res.status(422).json({ msg:"Este Local já está cadastrado!"})
  }

  //CREATE LOCAL
  const local = new Local({
    name, 
  })

  try {
    await local.save()
    return res.status(201).json({msg:"Novo Local adicionado com sucesso!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar o local! Erro:'+error})
  }
})

router.get('/locals',async function(req, res){
  const locals = await Local.findAll()
  if(locals.length == 0){
    return res.status(204).json({ msg:"Nenhum fabricante cadastrado!" })
  }
  return res.send(locals)
})

router.get('/local/:id', async (req, res) => {
  const id = req.params.id
  const local = await Local.findByPk(id)
  if(!local){
    return res.status(404).json({ msg:"Local não encontrado!"})
  }
   res.status(200).json({local})
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////ITEMS

router.post('/item/new', async(req, res)=>{
  const {description, barcode, quantity, minimum, adress, localId, brandId} =  req.body
  if(!description){
    return res.status(422).json({ msg:"Descrição é obrigatória!"})
  }
  if(!adress){
    return res.status(422).json({ msg:"Endereço de estoque é obrigatório!"})
  }

  //CHECK ITEM
  const itemExists = await Item.findOne({ where: { description: description } });
  if(itemExists){
    return res.status(422).json({ msg:"Este Item já está cadastrado!"})
  }

  //CREATE ITEM
  const item = new Item({
    description, 
    adress,
    barcode,
    quantity: quantity ? quantity : 0,
    minimum: minimum ? minimum : 0,
    brandId: brandId ? brandId : 1,
    localId: localId ? localId : 1,
  })

  try {
    await item.save()
    return res.status(201).json({msg:"Novo item adicionado com sucesso!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar o item! Erro:'+error})
  }
})

router.get('/items',async function(req, res){
  const items = await Item.findAll()
  if(items.length == 0){
    return res.status(204).json({ msg:"Nenhum item cadastrado!" })
  }
  return res.send(items)
})

router.get('/item/:id', async (req, res) => {
  const id = req.params.id
  const item = await Item.findByPk(id)
  if(!item){
    return res.status(404).json({ msg:"Item não encontrado!"})
  }
   res.status(200).json({item})
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////MOVEMENTS

router.post('/movement/new', async(req, res)=>{
  const {type, quantity, destination, itemId, userId} =  req.body
  if(!type){
    return res.status(422).json({ msg:"Tipo de movimentação é obrigatório!"})
  }
  if(!quantity || quantity == 0){
    return res.status(422).json({ msg:"Quantidade é obrigatória!"})
  }
  if(!destination){
    return res.status(422).json({ msg:"Destino é obrigatório!"})
  }
  if(!itemId){
    return res.status(422).json({ msg:"Item é obrigatório!"})
  }

  //CREATE MOVEMENT
  const movement = new Movement({
    type, 
    quantity,
    destination,
    itemId,
    userId,
  })

  try {
    await movement.save()
    return res.status(201).json({msg: 'OK'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'FAIL'})
  }
})

router.get('/movements',async function(req, res){
  const movements = await Movement.findAll()
  if(movements.length == 0){
    return res.status(204).json({ msg:"Nenhuma movimentação cadastrada!" })
  }
  return res.send(movements)
})

router.get('/movement/:id', async (req, res) => {
  const id = req.params.id
  const movement = await Movement.findByPk(id)
  if(!movement){
    return res.status(404).json({ msg:"Movimentação não encontrada!"})
  }
   res.status(200).json({movement})
})


module.exports = router;