const moment = require('moment-timezone');
const { Op } = require('sequelize');
const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Item = require('../models/Item')
const Local = require('../models/Local')
const Movement = require('../models/Movement')
const User = require('../models/User')
const Component = require('../models/Component')
const Unity = require('../models/Unity')

exports.getOne = async (req, res) => {
  const id = req.params.id
  const user = await User.findByPk(id,    
    {
      include: [
        {
          model: Movement,
          include: [
            {
              model: Item,
              include: [
                {
                  model: Component,
                  include: [
                    {
                      model: Unity
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  );
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" })
  }
  user.password = '************';
  res.status(200).json({ user })
}

exports.getAll = async (req, res) => {
  const { name } = req.query;

  let filter = {};

  if (name) {
    filter.name = { [Op.like]: `%${name}%` };
  }

  const dataIni = moment().subtract(1, 'months');
  const startDate = moment.tz(dataIni, "YYYY-MM-DD", 'America/Sao_Paulo').startOf('day').format();

  let lastMoves = {};
  lastMoves.createdAt = {
    [Op.gte]: startDate
  };

  const users = await User.findAll({
    where: filter, 
    attributes: { exclude: ['password'] } // Exclui o campo 'password'
    ,include: [
      {
        model: Movement,
        where: lastMoves,
        required: false
      }
    ],
  })
  return res.send(users)
}

exports.delete = async (req, res) => {
  const id = req.params.id
  const user = await User.findByPk(id)
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" })
  }
  try {
    await user.destroy();
    res.status(200).json({ msg: "Usuário excluído!" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Erro ao excluir o usuário! Erro:' + error })
  }
}

exports.update = async (req, res) => {
  const { name, email } = req.body
  const id = req.params.id;

  if (!name) {
    return res.status(422).json({ msg: "Nome é obrigatório!" })
  }
  if (!email) {
    return res.status(422).json({ msg: "E-mail é obrigatório!" })
  }
  //CHECK USER
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }
  const userExists = await User.findOne({ where: { email: email } });
  if (userExists && userExists.id != user.id) {
    return res.status(422).json({ msg: "Este e-mail já está cadastrado!" })
  }

  const updatedFields = {
    name: name || user.name,
    email: email || user.email,
  };

  try {
    await user.update(updatedFields)
    return res.status(200).json({ msg: "Usuário atualizado com sucesso!", user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Erro ao atualizar o usuário! Erro:' + error })
  }
}