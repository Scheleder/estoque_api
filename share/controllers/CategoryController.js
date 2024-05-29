const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')

exports.create = async(req, res)=>{
  const {name} =  req.body
  if(!name){
    return res.status(422).json({ msg:"Nome é obrigatório!"})
  }

  //CHECK Category
  const categoryExists = await Category.findOne({ where: { name: name } });
  if(categoryExists){
    return res.status(422).json({ msg:"Esta Categoria já está cadastrada!"})
  }

  //CREATE LOCAL
  const category = new Category({
    name, 
  })

  try {
    await category.save()
    return res.status(201).json({msg:"Nova Categoria adicionada com sucesso!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar a categoria! Erro:'+error})
  }
}

exports.getAll = async function(req, res){
  const categories = await Category.findAll()
  if(categories.length == 0){
    return res.status(204).json({ msg:"Nenhuma categoria cadastrada!" })
  }
  return res.send(categories)
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const category = await Category.findByPk(id, {include: [Item]})
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