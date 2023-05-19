const Sequelize = require('sequelize');

// User 클래스에 시퀄라이즈 안의 Model 클래스를 상속시켜준다.
class User extends Sequelize.Model {
    static init(sequelize){
        // 상속 받은 부모의 함수 실행시켜서 반환
        // init 메소드는 첫 번째 매개 변수로 컬럼에 대한 설정 값이 들어가고
        // 두 번째 매개 변수로 테이블의 자체 설정 값이 들어간다.
        return super.init({
            // 컬럼에 대한 설정
            // VARCHAR => STRING
            // allowNull : null 데이터 허용 유무
            // unique : 고유키로 사용할 것인지 여부. primaryKey로 사용할 수도 있음
            name : {
                type : Sequelize.STRING(20),
                allowNull : false,
                unique : true
            },
            // INT => INTEGER
            age : {
                type : Sequelize.INTEGER,
                allowNull : false
            },
            msg : {
                type : Sequelize.TEXT
            }
        },{
            // 테이블의 자체 설정
            // 매개 변수로 전달받은 값을 먼저 작성
            sequelize,
            // 테이블에 row가 추가 되었을 때 생성 시간과 업데이트 시간을 표기해준다.
            // created_at과 updated_at이라는 컬럼이 자동으로 추가된다.
            // 우리가 row를 추가했을 때나 수정했을 때 시간을 기록해준다.
            timestamps : true,
            // 표기법을 바꿔준다. 기본적으로 스네이크 표기법으로 되어 있는데 카멜 표기법으로 바꿔준다. ex)table_name => tableName
            underscored : false,
            // 모듈 이름 설정. 노드 프로젝트에서 사용
            modelName : "User",   
            // 복수형으로 설정해주는게 좋다.
            tableName : "users",
            // 이 부분을 true로 설정하면 deleted_at이라는 컬럼도 생성된다. 값이 남아있어도 표기된다.  
            paranoid : false,   
            // 인코딩 방식으로 필수적으로 작성해주어야 한다.
            charset : "utf8",   
            // 인코딩 방식으로 필수적으로 작성해주어야 한다.
            collate : "utf8_general_ci" 
        })
    }
    
    static associate(db){
        // 1 대 N 관계 예) 하나의 유저가 여러개의 글을 만드는 경우
        // 시퀄라이즈에서 1 대 N 관계를 hasMany 메소드로 정의한다. 테이블의 관계를 정의해 준다.
        // sourceKey : user 테이블 안에 어떤 키를 foreignKey와 연결해줄지 정의
        // hasMany 메소드의 첫 번째 매개 변수로 넘긴 테이블이 foreignKey에 연결이 되고 이름은 user_id이다.
        db.User.hasMany(db.Post, {foreignKey : "user_id", sourceKey : "id"})
    }
}

module.exports = User;