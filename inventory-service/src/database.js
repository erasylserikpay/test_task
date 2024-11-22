import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('products','postgres','Erasyl2007erasyl',{
    host: 'localhost',
    dialect: 'postgres',
})

export default sequelize;