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

exports.create = async (req, res) => {
  const { adress, quantity, minimum, localId, componentId } = req.body
  if (!adress) {
    return res.status(202).json({ msg: "Endereço de estoque é obrigatório!" })
  }
  if (!componentId) {
    return res.status(202).json({ msg: "Componente é obrigatório!" })
  }
  if (!localId) {
    return res.status(202).json({ msg: "Estoque é obrigatório!" })
  }

  //CHECK ITEM
  const itemExists = await Item.findOne({ where: { componentId: componentId, localId: localId } });
  if (itemExists) {
    return res.status(202).json({ msg: "Este item já existe e está posicionado no endereço " + itemExists.adress + "!" })
  }
  const adressBusy = await Item.findOne({ where: { adress: adress, localId: localId } });
  if (adressBusy) {
    return res.status(202).json({ msg: "Este endereço de estoque já está ocupado!" })
  }

  //CREATE ITEM
  const item = new Item({
    adress,
    quantity: quantity ? quantity : 0,
    minimum: minimum ? minimum : 0,
    localId: localId,
    componentId: componentId,
  })

  try {
    await item.save()
    return res.status(201).json({ msg: "Novo item adicionado com sucesso!", item })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Erro ao cadastrar o item! Erro:' + error })
  }
}


exports.getAll = async function (req, res) {
  const { address, localId, componentId } = req.query;

  let filter = {};

  if (address) {
    filter.address = { [Op.like]: `%${address}%` };
  }
  if (localId) {
    filter.localId = localId;
  }
  if (componentId) {
    filter.componentId = componentId;
  }

  try {
    const items = await Item.findAll({
      where: filter,
      include: [
        {
          model: Component,
          include: [
            {
              model: Brand
            },
            {
              model: Unity
            }
          ]
        },
        {
          model: Local
        }
      ]
    });
    return res.send(items);
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao buscar itens", error: error.message });
  }
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const item = await Item.findByPk(id,
    {
      include: [
        {
          model: Component,
          include: [
            {
              model: Brand
            }
          ]
        },
        {
          model: Movement,
          include: [
            {
              model: User
            }
          ]
        }
      ]
    }
  )
  if (!item) {
    return res.status(404).json({ msg: "Item não encontrado!" })
  }
  res.status(200).json({ item })
}

exports.delete = async (req, res) => {
  const id = req.params.id
  const item = await Item.findByPk(id)
  if (!item) {
    return res.status(404).json({ msg: "Item não encontrado!" })
  }
  try {
    await item.destroy();
    res.status(200).json({ msg: "Item excluído!" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Erro ao excluir o item! Erro:' + error })
  }
}

exports.update = async (req, res) => {
  const { adress, quantity, minimum, componentId, localId } = req.body
  const id = req.params.id;

  if (!componentId) {
    return res.status(202).json({ msg: "Componente é obrigatório!" })
  }
  if (!adress) {
    return res.status(202).json({ msg: "Endereço de estoque é obrigatório!" })
  }

  const item = await Item.findByPk(id)
  if (!item) {
    return res.status(404).json({ msg: "Item não encontrado!" })
  }

  //CHECK DESCRIPTION
  const nameExists = await Item.findOne({ where: { adress: adress } });
  if (nameExists && nameExists.id != item.id) {
    return res.status(202).json({ msg: "Este item já está cadastrado!" })
  }

  const updatedFields = {
    adress: adress || item.adress,
    quantity: quantity || item.quantity || 0,
    minimum: minimum || item.minimum || 0,
    componentId: componentId || item.componentId,
    localId: localId || item.localId,
    updatedAt: moment.tz('America/Sao_Paulo').format()
  };

  try {
    await item.update(updatedFields)
    return res.status(200).json({ msg: "Item atualizado com sucesso!", item: item });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Erro ao atualizar o item! Erro:' + error })
  }
}