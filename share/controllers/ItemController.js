const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')

exports.create = async(req, res)=>{
  const {description, barcode, quantity, minimum, adress, localId, brandId, categoryId} =  req.body
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
    categoryId: categoryId ? categoryId : 1,
  })

  try {
    await item.save()
    return res.status(201).json({msg:"Novo item adicionado com sucesso!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar o item! Erro:'+error})
  }
}

exports.getAll = async function(req, res){
  const items = await Item.findAll()
  if(items.length == 0){
    return res.status(204).json({ msg:"Nenhum item cadastrado!" })
  }
  return res.send(items)
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const item = await Item.findByPk(id, {include: [Brand, Category]})
  if(!item){
    return res.status(404).json({ msg:"Item não encontrado!"})
  }
   res.status(200).json({item})
}