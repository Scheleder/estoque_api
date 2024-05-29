const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')

exports.create = async (req, res) => {
  const { type, quantity, destination, itemId, userId, localId } = req.body
  if (!type) {
    return res.status(422).json({ msg: "Tipo de movimentação é obrigatório!" })
  }
  if (!quantity || quantity == 0) {
    return res.status(422).json({ msg: "Quantidade é obrigatória!" })
  }
  if (!destination) {
    return res.status(422).json({ msg: "Destino é obrigatório!" })
  }
  if (!itemId) {
    return res.status(422).json({ msg: "Item é obrigatório!" })
  }

  //CREATE MOVEMENT
  const movement = new Movement({
    type,
    quantity,
    destination,
    itemId,
    userId,
    localId
  })

  try {
    await movement.save()
    return res.status(201).json({ msg: 'OK' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'FAIL' })
  }
}

exports.getAll = async function (req, res) {
  const movements = await Movement.findAll()
  if (movements.length == 0) {
    return res.status(204).json({ msg: "Nenhuma movimentação cadastrada!" })
  }
  return res.send(movements)
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const movement = await Movement.findByPk(id, { include: [Item, User, Local] })
  if (!movement) {
    return res.status(404).json({ msg: "Movimentação não encontrada!" })
  }
  movement.User.password = '********';
  res.status(200).json({ movement })
}

exports.delete = async (req, res) => {
  const id = req.params.id
  const movement = await Movement.findByPk(id)
  if (!movement) {
    return res.status(404).json({ msg: "Movimentação não encontrada!" })
  }
  try {
    await movement.destroy();
    res.status(200).json({ msg: "Movimentação excluída!" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Erro ao excluir a movimentação! Erro:' + error })
  }
}

exports.update = async (req, res) => {
  const { type, destination, quantity, userId, localId, itemId } = req.body
  const id = req.params.id;

  if (!destination) {
    return res.status(422).json({ msg: "Destino é obrigatório!" })
  }
  if (!quantity) {
    return res.status(422).json({ msg: "Quantidade é obrigatória!" })
  }

  const movement = await Movement.findByPk(id)
  if (!movement) {
    return res.status(404).json({ msg: "Movimentação não encontrada!" })
  }

  const updatedFields = {
    type: type || movement.type,
    destination: destination || movement.destination,
    quantity: quantity || movement.quantity || 1,
    userId: userId || movement.userId || 1,
    itemId: itemId || movement.itemId || 1,
    localId: localId || movement.localId || 1,
  };

  try {
    await movement.update(updatedFields)
    return res.status(200).json({ msg: "Movimentação atualizada com sucesso!", movement: movement });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Erro ao atualizar a movimentação! Erro:' + error })
  }
}