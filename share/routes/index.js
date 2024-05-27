const express = require('express');
const router = express.Router();
const moment = require('moment');
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//////////////////////////////////////////////////////////////////////////////////////////////////////////ROTAS
const UserRouter = require('./UserRouter');
const BrandRouter = require('./BrandRouter');
const ItemRouter = require('./ItemRouter');
const LocalRouter = require('./LocalRouter');
const MovementRouter = require('./MovementRouter');

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
router.use('/users', UserRouter);
router.use('/brands', BrandRouter);
router.use('/items', ItemRouter);
router.use('/locals', LocalRouter);
router.use('/movements', MovementRouter);

// router.get('/users',async function(req, res){
//   const users = await User.findAll({
//     attributes: { exclude: ['password'] } // Exclui o campo 'password'
//   })
//   if(users.length == 0){
//     return res.status(204).json({ msg:"Nenhum usuário cadastrado!" })
//   }
//   return res.send(users)
// })

// router.get('/user/:id', async (req, res) => {
//   const id = req.params.id
//   //check user
//   const user = await User.findByPk(id, {
//     attributes: { exclude: ['password'] } // Exclui o campo 'password'
//   })
//   if(!user){
//     return res.status(404).json({ msg:"Usuário não encontrado!" })
//   }
//    res.status(200).json({user})
// })

module.exports = router;