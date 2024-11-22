import {DataTypes, Model} from 'sequelize'
import sequelize from '../database.js'

class Stocks extends Model {}

Stocks.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    product_id: {type: DataTypes.INTEGER, allowNull: false},
    shop_id: {type: DataTypes.INTEGER, allowNull: false},
    quantity_on_shelf: {type: DataTypes.INTEGER, allowNull: false},
    quantity_in_order: {type: DataTypes.INTEGER, allowNull: false},
},{
    sequelize,
    modelName: 'stocks',
    timestamps: false,
})

export default Stocks;