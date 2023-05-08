const mysql = require("./config");

// 글의 내용, 작성, 추가, 삭제 등 게시판의 기능이 작성될 공간
const posts = {
    // 테이블 초기화 함수
    initTable : async function(){
        try {
            const [result] = await mysql.query("SELECT * FROM posts");
            console.log(result);
        } catch (error) {
            // console.log(error);
            await mysql.query("CREATE TABLE posts(id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(20),content VARCHAR(100))");
        }
    },

    // 리스트를 조회하는 함수
    viewPostAll : async function(){
        try {
            const [result] = await mysql.query("SELECT * FROM posts");
            return result;
        } catch (error) {
            console.log("글 전체 조회 에러 발생");
        }
    },

    // 글을 선택했을 때 보여주는 함수
    selectPost : async function(id){
        try {
            const [result] = await mysql.query("SELECT * FROM posts WHERE id=?", [id]);
            console.log("선택한 게시글 : ",result[0]);
            return result[0];
        } catch (error) {
            console.log("글 선택 조회 에러남");
        }
    },

    // 글을 추가하는 함수
    insert : async function(title, content){
        try {
            await mysql.query("INSERT INTO posts (title,content)VALUES(?,?)",[title,content]);
            console.log("글 추가 완료");
        } catch (error) {
            console.log("글 추가 에러 남");
        }
    },

    // 글을 수정하는 함수
    update : async function(id,title,content){
        try {
            await mysql.query("UPDATE posts SET title=?,content=? WHERE id=?",[title,content,id]);
            console.log("글 수정 완료");
        } catch (error) {
            console.log(error);
        }
    },

    // 글을 삭제하는 함수
    delete : async function(id){
        try {
            await mysql.query("DELETE FROM posts WHERE id=?; SET @CNT = 0;UPDATE posts SET posts.id = @CNT := @CNT + 1;ALTER TABLE posts AUTO_INCREMENT = 0;",[id]);
            console.log("글 삭제 완료");
        } catch (error) {
            console.log("글 삭제 에러남");
        }
    }
}

posts.initTable();
// posts.insert("타이틀 추가","컨텐츠 추가");
// posts.update(1,"타이틀 수정", "컨텐츠 수정");
// posts.delete(2);

module.exports = posts;