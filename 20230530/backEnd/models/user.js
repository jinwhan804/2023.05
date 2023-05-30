const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_id :{
                type : Sequelize.STRING(20),
                allowNull : false
            },
            user_pw : {
                type : Sequelize.STRING(64),
                allowNull : false
            },
            name : {
                type : Sequelize.STRING(20),
                allowNull : false
            },
            image : {
                type : Sequelize.STRING(100),
                defaultValue : 'http://localhost:5000/img/git.bp_1685410781636.png'
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'User',
            tableName : 'users',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci'
        })
    }
}

module.exports = User;