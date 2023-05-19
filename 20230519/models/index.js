const Sequelize = require('sequelize');
const config = require('./config');
const User = require('./users');
const Post = require('./post');

// 시퀄라이즈 객체 생성
const _sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
)

// 내보내줄 빈 객체
const db = {};
db.sequelize = _sequelize;
db.User = User;
db.Post = Post;

// 테이블을 초기화 하는 함수
User.init(_sequelize);
Post.init(_sequelize);
User.associate(db);
Post.associate(db);

module.exports = db;