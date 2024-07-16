const moment = require('moment-timezone');
const { Op } = require('sequelize');
const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User');
const Component = require('../models/Component');
const Unity = require('../models/Unity');

exports.create = async (req, res) => {
  const { type, quantity, destination, itemId, userId, localId } = req.body
  if (!type) {
    return res.status(202).json({ msg: "Tipo de movimentação é obrigatório!" })
  }
  if (!itemId) {
    return res.status(202).json({ msg: "Item é obrigatório!" })
  }

  const targetItem = await Item.findByPk(itemId)
  const updatedFields = {}; 

  if(type === 'Ajuste de estoque'){
    updatedFields = {
      quantity: quantity
    };  
  }
  else if(type === 'Alterar endereço de estoque'){
    updatedFields = {
      adress: destination
    }; 
  }
  
  await targetItem.update(updatedFields)

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
    return res.status(201).json({ msg: '✔ ' + type, movement })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Ocorreu um erro inesperado' })
  }
}


exports.getAll = async function (req, res) {
  const { description, barcode, address, localId, brandId, categoryId, dataIni, dataFim } = req.query;

  let filter = {};

  if (description) {
    filter.description = { [Op.like]: `%${description}%` };
  }
  if (barcode) {
    filter.barcode = barcode;
  }
  if (address) {
    filter.address = { [Op.like]: `%${address}%` };
  }
  if (localId) {
    filter.localId = localId;
  }
  if (brandId) {
    filter.brandId = brandId;
  }
  if (categoryId) {
    filter.categoryId = categoryId;
  }

  if (dataIni && dataFim) {
    const startDate = moment.tz(dataIni, "YYYY-MM-DD", 'America/Sao_Paulo').startOf('day').format();
    const endDate = moment.tz(dataFim, "YYYY-MM-DD", 'America/Sao_Paulo').endOf('day').format();

    filter.createdAt = {
      [Op.between]: [startDate, endDate]
    };
  } else if (dataIni) {
    const startDate = moment.tz(dataIni, "YYYY-MM-DD", 'America/Sao_Paulo').startOf('day').format();

    filter.createdAt = {
      [Op.gte]: startDate
    };
  } else if (dataFim) {
    const endDate = moment.tz(dataFim, "YYYY-MM-DD", 'America/Sao_Paulo').endOf('day').format();

    filter.createdAt = {
      [Op.lte]: endDate
    };
  }

  try {
    const movements = await Movement.findAll({
      where: filter,
      include: [
        {
          model: Item,
          include: [
            {
              model: Component,
              include: [
                {
                  model: Unity
                },
                {
                  model: Brand
                }
              ]
            }
          ]
        },
        {
          model: User,
          attributes: { exclude: ['password'] }
        }
      ]
    });

    return res.send(movements);

  } catch (error) {
    return res.status(500).json({ msg: "Erro ao buscar movimentações", error: error.message });
  }
}

exports.getOne = async (req, res) => {
  const id = req.params.id
  const movement = await Movement.findByPk(id,
    {
      include: [
        {
          model: Item
        },
        {
          model: User,
          attributes: { exclude: ['password'] }
        }
      ]
    }
  );

  if (!movement) {
    return res.status(404).json({ msg: "Movimentação não encontrada!" })
  }
  //movement.User.password = '********';
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
    return res.status(202).json({ msg: "Destino é obrigatório!" })
  }
  if (!quantity) {
    return res.status(202).json({ msg: "Quantidade é obrigatória!" })
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