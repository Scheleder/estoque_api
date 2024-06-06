const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');
const Local = require('../models/Local')
const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Unity = require('../models/Unity')

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

Item.belongsTo(Brand, { constraint:true, foreignKey: 'brandId' });
Item.belongsTo(Local, { constraint:true, foreignKey: 'localId' });
Item.belongsTo(Category, { constraint:true, foreignKey: 'categoryId' });
Item.belongsTo(Unity, { constraint:true, foreignKey: 'unityId' });
Brand.hasMany(Item, { foreignKey: 'brandId' });
Local.hasMany(Item, { foreignKey: 'localId' });
Category.hasMany(Item, { foreignKey: 'categoryId' });
Unity.hasMany(Item, { foreignKey: 'unityId' });

module.exports = Item;