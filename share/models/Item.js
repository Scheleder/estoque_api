const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');
const Local = require('../models/Local')
const Brand = require('../models/Brand')
const Movement = require('../models/Movement')

const Item = database.define('Item', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    barcode: {
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
    adress: {
        type: DataTypes.STRING
        // allowNull defaults to true
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
});

Item.Movements = Item.hasMany(Movement, { foreignKey: 'itemId' });
Item.Brand = Item.belongsTo(Brand, { foreignKey: 'brandId' });
Item.Local = Item.belongsTo(Local, { foreignKey: 'localId' });

module.exports = Item;