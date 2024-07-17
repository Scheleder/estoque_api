const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Component = require('../models/Component')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')

exports.create = async(req, res)=>{
  const {name, website, logo} =  req.body
  if(!name){
    return res.status(202).json({ msg:"Nome é obrigatório!"})
  }

  //CHECK BRAND
  const brandExists = await Brand.findOne({ where: { name: name } });
  if(brandExists){
    return res.status(202).json({ msg:"Este Fabricante já está cadastrado!"})
  }

  //CREATE BRAND
  const brand = new Brand({
    name, 
    website,
    logo,
  })

  try {
    await brand.save()
    return res.status(201).json({msg:"Novo Fabricante adicionado com sucesso!", brand})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar o fabricante! Erro:'+error})
  }
}

exports.getAll = async function(req, res){
  const { name } = req.query;

  let filter = {};

  if (name) {
    filter.name = { [Op.like]: `%${name}%` };
  }

  const brands = await Brand.findAll({ 
    where: filter, 
    include: [
      {
        model: Component,
      }
    ]
  });
  return res.send(brands)
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const brand = await Brand.findByPk(id, 
    {
      include: [
        {
          model: Component,
          include: [
            {
              model: Category
            }
          ]
        }
      ]
    }
    )
  if(!brand){
    return res.status(404).json({ msg:"Fabricante não encontrado!"})
  }
   res.status(200).json({brand})
}

exports.delete = async (req, res) => {
  const id = req.params.id
  const brand = await Brand.findByPk(id)
  if(!brand){
    return res.status(404).json({ msg:"Fabricante não encontrado!"})
  }
  try {
    await brand.destroy();
    res.status(200).json({msg: "Fabricante excluído!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao excluir o fabricante! Erro:'+error})
  }
}

exports.update = async(req, res)=>{
  const {name, website, logo} =  req.body
  const id = req.params.id;

  if(!name){
    return res.status(202).json({ msg:"Nome é obrigatório!"})
  }

  const brand = await Brand.findByPk(id);
  if (!brand) {
    return res.status(404).json({ msg: "Fabricante não encontrado!" });
  }
  //CHECK NAME
  const nameExists = await Brand.findOne({ where: { name: name } });
  if(nameExists && nameExists.id != brand.id){
    return res.status(202).json({ msg:"Este nome já está cadastrado!"})
  }

  const updatedFields = {
    name: name || brand.name,
    website: website || brand.website,
    logo: logo || brand.logo,
    updatedAt: moment.tz('America/Sao_Paulo').format()
  };

  try {
    await brand.update(updatedFields)
    return res.status(200).json({ msg: "Fabricante atualizado com sucesso!", brand: brand });
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao atualizar o fabricante! Erro:'+error})
  }
}
