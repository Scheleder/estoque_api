const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')

exports.create = async(req, res)=>{
  const {name} =  req.body
  if(!name){
    return res.status(202).json({ msg:"Nome é obrigatório!"})
  }

  //CHECK LOCAL
  const localExists = await Local.findOne({ where: { name: name } });
  if(localExists){
    return res.status(202).json({ msg:"Este Local já está cadastrado!"})
  }

  //CREATE LOCAL
  const local = new Local({
    name, 
  })

  try {
    await local.save()
    return res.status(201).json({msg:"Novo Local adicionado com sucesso!", local})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar o local! Erro:'+error})
  }
}

exports.getAll = async function(req, res){
  const { name } = req.query;

  let filter = {};

  if (name) {
    filter.name = { [Op.like]: `%${name}%` };
  }
  const locals = await Local.findAll({ where: filter, include: [Item]})
  return res.send(locals)
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const local = await Local.findByPk(id, {include: [Item]})
  if(!local){
    return res.status(404).json({ msg:"Local não encontrado!" })
  }
   res.status(200).json({local})
}

exports.delete = async (req, res) => {
  const id = req.params.id
  const local = await Local.findByPk(id)
  if(!local){
    return res.status(404).json({ msg:"Local não encontrado!"})
  }
  try {
    await local.destroy();
    res.status(200).json({msg: "Local excluído!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao excluir o local! Erro:'+error})
  }
}

exports.update = async(req, res)=>{
  const {name} =  req.body
  const id = req.params.id;

  if(!name){
    return res.status(422).json({ msg:"Nome é obrigatório!"})
  }
  
  const local = await Local.findByPk(id);
  if (!local) {
    return res.status(404).json({ msg: "Local não encontrado!" });
  }
  //CHECK NAME
  const nameExists = await Local.findOne({ where: { name: name } });
  if(nameExists && nameExists.id != local.id){
    return res.status(422).json({ msg:"Este nome já está cadastrado!"})
  }

  const updatedFields = {
    name: name || local.name,
  };

  try {
    await local.update(updatedFields)
    return res.status(200).json({ msg: "Local atualizado com sucesso!", local: local });
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao atualizar o local! Erro:'+error})
  }
}