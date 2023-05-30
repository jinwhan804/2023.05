const Sequelize = require('sequelize');

class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title : {
                type : Sequelize.STRING(20),
                allowNull : false
            },
            content : {
                type : Sequelize.STRING(100),
                allowNull : false
            },
            user_name : {
                type : Sequelize.STRING(20),
                allowNull : false
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : "Post",
            tableName : "posts",
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci'
        })
    }

    static associate(db){
        db.Post.belongsTo(db.User,{foreignKey : 'userId', targetKey : 'id'});
    }
}

module.exports = Post;