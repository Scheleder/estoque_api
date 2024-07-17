const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Component = require('../models/Component')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')
const moment = require('moment-timezone');

exports.create = async(req, res)=>{
  const {name} =  req.body
  if(!name){
    return res.status(202).json({ msg:"Nome é obrigatório!"})
  }

  //CHECK Category
  const categoryExists = await Category.findOne({ where: { name: name } });
  if(categoryExists){
    return res.status(202).json({ msg:"Esta Categoria já está cadastrada!"})
  }

  //CREATE LOCAL
  const category = new Category({
    name, 
  })

  try {
    await category.save()
    return res.status(201).json({msg:"Nova Categoria adicionada com sucesso!", category})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar a categoria! Erro:'+error})
  }
}

exports.getAll = async function(req, res){
  const categories = await Category.findAll()
  return res.send(categories)
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const category = await Category.findByPk(id, {include: [Component]})
  if(!category){
    return res.status(404).json({ msg:"Categoria não encontrada!" })
  }
   res.status(200).json({category})
}

exports.delete = async (req, res) => {
  const id = req.params.id
  const category = await Category.findByPk(id)
  if(!category){
    return res.status(404).json({ msg:"Categoria não encontrada!"})
  }
  try {
    await category.destroy();
    res.status(200).json({msg: "Categoria excluída!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao excluir a categoria! Erro:'+error})
  }
}

exports.update = async(req, res)=>{
  const {name} =  req.body
  const id = req.params.id;

  if(!name){
    return res.status(202).json({ msg:"Nome é obrigatório!"})
  }
  
  const category = await Category.findByPk(id);
  if (!category) {
    return res.status(404).json({ msg: "Categoria não encontrada!" });
  }
  //CHECK NAME
  const nameExists = await Category.findOne({ where: { name: name } });
  if(nameExists && nameExists.id != category.id){
    return res.status(202).json({ msg:"Este nome já está cadastrado!"})
  }

  const updatedFields = {
    name: name || category.name,
    updatedAt: moment.tz('America/Sao_Paulo').format()
  };

  try {
    await category.update(updatedFields)
    return res.status(200).json({ msg: "Categoria atualizada com sucesso!", category: category });
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao atualizar a categoria! Erro:'+error})
  }
}