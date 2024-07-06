const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')
const Unity = require('../models/Unity')

exports.create = async(req, res)=>{
  const {name, abrev} =  req.body
  if(!name){
    return res.status(202).json({ msg:"Nome é obrigatório!"})
  }
  if(!abrev){
    return res.status(202).json({ msg:"Abreviatura é obrigatória!"})
  }
  //CHECK LOCAL
  const unityExists = await Unity.findOne({ where: { name: name } });
  if(unityExists){
    return res.status(202).json({ msg:"Esta Unidade já está cadastrado!"})
  }

  //CREATE LOCAL
  const unity = new Unity({
    name, 
    abrev
  })

  try {
    await unity.save()
    return res.status(201).json({msg:"Nova Unidade adicionada com sucesso!", unity})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar a unidade! Erro:'+error})
  }
}

exports.getAll = async function(req, res){
  const units = await Unity.findAll()
  return res.send(units)
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const unity = await Unity.findByPk(id)
  if(!unity){
    return res.status(404).json({ msg:"Unidade não encontrada!" })
  }
   res.status(200).json({unity})
}

exports.delete = async (req, res) => {
  const id = req.params.id
  const unity = await Unity.findByPk(id)
  if(!unity){
    return res.status(404).json({ msg:"Unidade não encontrada!"})
  }
  try {
    await unity.destroy();
    res.status(200).json({msg: "Unidade excluída!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao excluir a unidade! Erro:'+error})
  }
}

exports.update = async(req, res)=>{
  const {name} =  req.body
  const id = req.params.id;

  if(!name){
    return res.status(202).json({ msg:"Nome é obrigatório!"})
  }
  
  const unity = await Unity.findByPk(id);
  if (!unity) {
    return res.status(404).json({ msg: "Unidade não encontrado!" });
  }
  //CHECK NAME
  const nameExists = await Unity.findOne({ where: { name: name } });
  if(nameExists && nameExists.id != unity.id){
    return res.status(202).json({ msg:"Este nome já está cadastrado!"})
  }

  const updatedFields = {
    name: name || unity.name,
  };

  try {
    await unity.update(updatedFields)
    return res.status(200).json({ msg: "Unidade atualizada com sucesso!", unity: unity });
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao atualizar a unidade! Erro:'+error})
  }
}