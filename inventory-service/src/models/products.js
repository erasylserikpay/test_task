import {DataTypes, Model} from 'sequelize'
import sequelize from '../database.js'

class Products extends Model {}

Products.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    plu: {type: DataTypes.STRING, allowNull: false},
},{
    sequelize,
    modelName: 'products',
    timestamps: false,
})

export default Products;