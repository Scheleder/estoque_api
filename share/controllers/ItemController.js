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

exports.delete = async (req, res) => {
  const id = req.params.id
  const item = await Item.findByPk(id)
  if(!item){
    return res.status(404).json({ msg:"Item não encontrado!"})
  }
  try {
    await item.destroy();
    res.status(200).json({msg: "Item excluído!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao excluir o item! Erro:'+error})
  }
}

exports.update = async(req, res)=>{
  const {description, barcode, quantity, minimum, adress, brandId, localId, categoryId} =  req.body
  const id = req.params.id;

  if(!description){
    return res.status(422).json({ msg:"Descrição é obrigatória!"})
  }
  if(!adress){
    return res.status(422).json({ msg:"Endereço de estoque é obrigatório!"})
  }

  const item = await Item.findByPk(id)
  if(!item){
    return res.status(404).json({ msg:"Item não encontrado!"})
  }

  //CHECK DESCRIPTION
  const nameExists = await Item.findOne({ where: { description: description } });
  if(nameExists && nameExists.id != item.id){
    return res.status(422).json({ msg:"Este item já está cadastrado!"})
  }

  const updatedFields = {
    description: description || item.description, 
    adress: adress || item.adress,
    barcode: barcode || item.barcode,
    quantity: quantity || item.quantity || 0,
    minimum: minimum || item.minimum || 0,
    brandId: brandId || item.brandId || 1,
    localId: localId || item.localId || 1,
    categoryId: categoryId || item.categoryId || 1,
  };

  try {
    await item.update(updatedFields)
    return res.status(200).json({ msg: "Item atualizado com sucesso!", item: item });
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao atualizar o item! Erro:'+error})
  }
}