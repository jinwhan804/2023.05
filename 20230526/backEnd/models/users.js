const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name : {
                type : Sequelize.STRING(20),
                allowNull : false
            },
            age : {
                type : Sequelize.INTEGER,
                allowNull : false
            },
            user_id : {
                type : Sequelize.STRING(20),
                allowNull : true
            },
            user_pw : {
                type : Sequelize.STRING(64),
                allowNull : true
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : "User",
            tableName : "users",
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci'
        })
    }

    static associate(db){
        db.User.hasMany(db.Post, {foreignKey : 'userId', sourceKey : 'id'});
    }
}

module.exports = User;