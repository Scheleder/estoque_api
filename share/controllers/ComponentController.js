const { Op } = require('sequelize');
const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')
const Unity = require('../models/Unity')
const Component = require('../models/Component')
const moment = require('moment-timezone');

exports.create = async(req, res)=>{
  const {description, barcode, sku, brandId, categoryId, unityId} =  req.body
  if(!description){
    return res.status(202).json({ msg:"Descrição é obrigatória!"})
  }

  //CHECK ITEM
  const componentExists = await Component.findOne({ where: { description: description } });
  if(componentExists){
    return res.status(202).json({ msg:"Este Componente já está cadastrado!"})
  }

  //CREATE ITEM
  const component = new Component({
    description, 
    sku,
    barcode,
    brandId: brandId ? brandId : 1,
    categoryId: categoryId ? categoryId : 1,
    unityId: unityId ? unityId : 1,
  })

  try {
    await component.save()
    return res.status(201).json({msg:"Novo componente adicionado com sucesso!", component})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar o componente! Erro:'+error})
  }
}


exports.getAll = async function(req, res) {
  const { description, barcode, sku, brandId, categoryId, unityId } = req.query;

  let filter = {};

  if (description) {
    filter.description = { [Op.like]: `%${description}%` };
  }
  if (barcode) {
    filter.barcode = barcode;
  }
  if (sku) {
    filter.sku = { [Op.like]: `%${sku}%` };
  }
  if (brandId) {
    filter.brandId = brandId;
  }
  if (categoryId) {
    filter.categoryId = categoryId;
  }
  if (unityId) {
    filter.unityId = unityId;
  }

  try {
    const components = await Component.findAll({ where: filter, include: [Brand, Category, Unity]});
    return res.send(components);
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao buscar componentes", error: error.message });
  }
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const component = await Component.findByPk(id, {include: [Brand, Category, Unity]})
  if(!component){
    return res.status(404).json({ msg:"Componente não encontrado!"})
  }
   res.status(200).json({component})
}

exports.delete = async (req, res) => {
  const id = req.params.id
  const component = await Component.findByPk(id)
  if(!component){
    return res.status(404).json({ msg:"Componente não encontrado!"})
  }
  try {
    await component.destroy();
    res.status(200).json({msg: "Componente excluído!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao excluir o componente! Erro:'+error})
  }
}

exports.update = async(req, res)=>{
  const {description, barcode, sku, brandId, categoryId, unityId} =  req.body
  const id = req.params.id;

  if(!description){
    return res.status(202).json({ msg:"Descrição é obrigatória!"})
  }

  const component = await Component.findByPk(id)
  if(!component){
    return res.status(404).json({ msg:"Componente não encontrado!"})
  }

  //CHECK DESCRIPTION
  const nameExists = await Component.findOne({ where: { description: description } });
  if(nameExists && nameExists.id != component.id){
    return res.status(202).json({ msg:"Este componente já está cadastrado!"})
  }

  const updatedFields = {
    description: description || component.description, 
    sku: sku || component.sku,
    barcode: barcode || component.barcode,
    brandId: brandId || component.brandId || 1,
    categoryId: categoryId || component.categoryId || 1,
    unityId: unityId || component.unityId || 1,
    updatedAt: moment.tz('America/Sao_Paulo').format()
  };

  try {
    await component.update(updatedFields)
    return res.status(200).json({ msg: "Componente atualizado com sucesso!", component: component });
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao atualizar o componente! Erro:'+error})
  }
}