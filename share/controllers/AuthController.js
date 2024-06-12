const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//SEND MAIL
sendRegistrationMail = function (user){
    if(user){
        return true;
    }
    return false;
}

//CREATE RANDOM CODE
codeGenerate = function(){
    const code = Math.floor(Math.random() * 900000) + 100000;
    return code.toString();
}

exports.login = async(req, res)=>{
    console.log('login')
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
        if(!user.code){
            return res.status(200).json({msg:"Logado com sucesso!", token, user:{id:user.id, name:user.name, email:user.email}})
        }else{
            return res.status(200).json({msg:"code"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'Erro ao cadastrar o usuário! Erro:'+error})
    }
}

exports.register = async(req, res)=>{
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
        code: codeGenerate()
    })
    
    try {
        await user.save()        
        if(sendRegistrationMail(user)){
            return res.status(201).json({msg:"Enviamos um código para "+user.email+". Use este código para fazer login pela primeira vez."})
        }else{
            return res.status(404).json({ msg:"Falha ao enviar o email de confirmação!"})
        }        
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'Erro ao cadastrar o usuário! Erro:'+error})
    }
}

exports.checkCode = async(req, res)=>{
    const {userId, code} =  req.body;
    if(!code){
        return res.status(422).json({ msg:"Código é obrigatório!"})
    }
    const user = await User.findByPk(userId);
    if(!user){
        return res.status(404).json({ msg:"Usuário não encontrado!"})
    }

    if(user.code == code){
        try {
            await user.update({code: null})
            return res.status(200).json({ msg: "Email confirmado com sucesso!", user: {id:user.id, name:user.name, email:user.email} });
          } catch (error) {
            console.log(error)
            return res.status(500).json({msg: 'Erro ao confirmar o e-mail! Erro:'+error})
          }
    }else{
        try {
            await user.update({code: codeGenerate()})
            if(sendRegistrationMail(user)){
                return res.status(201).json({msg:"OS códigos não conferem. Enviamos um novo código de verificação para "+user.email+"."})
            }else{
                return res.status(404).json({ msg:"Falha ao enviar o email de confirmação!"})
            } 
          } catch (error) {
            console.log(error)
            return res.status(500).json({msg: 'Erro ao confirmar o e-mail! Erro:'+error})
          }


    }
}