const Brand = require('../models/Brand')

exports.create = async(req, res)=>{
  const {name, website, logo} =  req.body
  if(!name){
    return res.status(422).json({ msg:"Nome é obrigatório!"})
  }

  //CHECK BRAND
  const brandExists = await Brand.findOne({ where: { name: name } });
  if(brandExists){
    return res.status(422).json({ msg:"Este Fabricante já está cadastrado!"})
  }

  //CREATE BRAND
  const brand = new Brand({
    name, 
    website,
    logo,
  })

  try {
    await brand.save()
    return res.status(201).json({msg:"Novo Fabricante adicionado com sucesso!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'Erro ao cadastrar o fabricante! Erro:'+error})
  }
}

exports.getAll = async function(req, res){
  const brands = await Brand.findAll()
  if(brands.length == 0){
    return res.status(204).json({ msg:"Nenhum Fabricante cadastrado!" })
  }
  return res.send(brands)
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const brand = await Brand.findByPk(id)
  if(!brand){
    return res.status(404).json({ msg:"Fabricante não encontrado!"})
  }
   res.status(200).json({brand})
}