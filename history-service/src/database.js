import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('history','postgres','Erasyl2007erasyl',{
    host: 'localhost',
    dialect: 'postgres',
})

export default sequelize;