const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');
const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Unity = require('../models/Unity')

const Component = database.define('Component', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    barcode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sku: {
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

Component.belongsTo(Brand, { constraint:true, foreignKey: 'brandId' });
Component.belongsTo(Category, { constraint:true, foreignKey: 'categoryId' });
Component.belongsTo(Unity, { constraint:true, foreignKey: 'unityId' });
Brand.hasMany(Component, { foreignKey: 'brandId' });
Category.hasMany(Component, { foreignKey: 'categoryId' });
Unity.hasMany(Component, { foreignKey: 'unityId' });

module.exports = Component;