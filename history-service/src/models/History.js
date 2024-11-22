import {DataTypes, Model} from 'sequelize'
import sequelize from '../database.js'

class History extends Model {}

History.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    stock_id: {type: DataTypes.INTEGER, allowNull: false},
    new_quantity_on_shelf: {type: DataTypes.INTEGER, allowNull: false},
    old_quantity_in_order: {type: DataTypes.INTEGER, allowNull: false},
    new_quantity_in_order: {type: DataTypes.INTEGER, allowNull: false},
    old_quantity_on_shelf: {type: DataTypes.INTEGER, allowNull: false},
    updated_at: {type: DataTypes.DATE, allowNull: false},
},{
    sequelize,
    modelName: 'history_stocks',
    timestamps: false,
})

export default History;