const Sequelize = require('sequelize');

class Post extends Sequelize.Model{
    static init(sequelize){
        // 첫 번째 매개 변수 컬럼의 내용, 두 번째 매개 변수 테이블의 내용
        return super.init({
            msg : {
                type : Sequelize.STRING(100),
                allowNull : false
            }
        },{
            sequelize,
            timestamps : true,
            modelName : "Post",
            tableName : "posts",
            charset : "utf8",
            collate : "utf8_general_ci"
        })
    }

    static associate(db){
        // 1 대 N 관계 예) 하나의 유저가 여러개의 글을 만드는 경우
        // 시퀄라이즈에서 1 대 N 관계를 hasMany 메소드로 정의한다. 테이블의 관계를 정의해 준다.
        
        // belongsTo 메소드를 사용해서 user의 id를 foreignKey로 연결한다.
        // 유저의 id가 따라갈 참조키는 user_id
        db.Post.belongsTo(db.User,{ foreignKey : "user_id", targetKey : "id"})
    }
}

module.exports = Post;