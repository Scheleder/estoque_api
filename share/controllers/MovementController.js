const Brand = require('../models/Brand')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')

exports.create = async(req, res)=>{
  const {type, quantity, destination, itemId, userId} =  req.body
  if(!type){
    return res.status(422).json({ msg:"Tipo de movimentação é obrigatório!"})
  }
  if(!quantity || quantity == 0){
    return res.status(422).json({ msg:"Quantidade é obrigatória!"})
  }
  if(!destination){
    return res.status(422).json({ msg:"Destino é obrigatório!"})
  }
  if(!itemId){
    return res.status(422).json({ msg:"Item é obrigatório!"})
  }

  //CREATE MOVEMENT
  const movement = new Movement({
    type, 
    quantity,
    destination,
    itemId,
    userId,
  })

  try {
    await movement.save()
    return res.status(201).json({msg: 'OK'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: 'FAIL'})
  }
}

exports.getAll = async function(req, res){
  const movements = await Movement.findAll()
  if(movements.length == 0){
    return res.status(204).json({ msg:"Nenhuma movimentação cadastrada!" })
  }
  return res.send(movements)
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const movement = await Movement.findByPk(id, {include: [Item, User]})
  movement.User.password = '********';
  if(!movement){
    return res.status(404).json({ msg:"Movimentação não encontrada!"})
  }
   res.status(200).json({movement})
}