const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')

exports.getOne = async (req,res)=>{
    const id = req.params.id
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] } // Exclui o campo 'password'
    })
    if(!user){
      return res.status(404).json({ msg:"Usuário não encontrado!" })
    }
     res.status(200).json({user})
}

exports.getAll = async (req,res)=>{
    const users = await User.findAll({
        attributes: { exclude: ['password'] } // Exclui o campo 'password'
      })
      if(users.length == 0){
        return res.status(204).json({ msg:"Nenhum usuário cadastrado!" })
      }
      return res.send(users)
}

exports.delete = async (req, res) => {
  const id = req.params.id
  const user = await User.findByPk(id)
  if(!user){
    return res.status(404).json({ msg:"Usuário não encontrado!"})
  }
  try {
    await user.destroy();
    res.status(200).json({msg: "Usuário excluído!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao excluir o usuário! Erro:'+error})
  }
}