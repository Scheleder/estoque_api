const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');
const Local = require('../models/Local')
const Component = require('../models/Component')

const Item = database.define('Item', {
    adress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.DECIMAL(10, 4),
        defaultValue: 0.0000,
    },
    minimum: {
        type: DataTypes.DECIMAL(10, 4),
        defaultValue: 0.0000,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
},
}, {
    timestamps: true,
    paranoid: true
});

Item.belongsTo(Local, { constraint:true, foreignKey: 'localId' });
Item.belongsTo(Component, { constraint:true, foreignKey: 'componentId' });
Local.hasMany(Item, { foreignKey: 'localId' });
Component.hasMany(Item, { foreignKey: 'componentId' });

module.exports = Item;