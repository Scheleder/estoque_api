const Brand = require('../models/Brand')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')

exports.create = async(req, res)=>{
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
}

exports.getAll = async function(req, res){
  const locals = await Local.findAll()
  if(locals.length == 0){
    return res.status(204).json({ msg:"Nenhum fabricante cadastrado!" })
  }
  return res.send(locals)
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const local = await Local.findByPk(id)
  if(!local){
    return res.status(404).json({ msg:"Local não encontrado!" })
  }
   res.status(200).json({local})
}