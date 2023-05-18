-- 데이터 베이스 : 데이터를 저장하는 공간
-- sql 명령어는 데이터 베이스에 구현된 기능을 실행시키기 위해 사용하는 특정한 언어
-- 데이터를 보관, 저장, 삭제, 수정을 할 수 있다.

-- 관계형 데이터 베이스 : mysql, oracle, mariaDB 등
-- 비관계형 데이터 베이스 : MongoDB 등

-- CLI로 mysql에 접속하는 방법
-- mysql -u root -p 입력 후 비밀번호 입력

-- 스키마 전부 확인 
-- show databases

-- sql문은 데이터 정의어(DDL), 데이터 조작어(DML), 데이터 제어어(DCL)가 존재한다.

-- 데이터 정의어 : CREATE, SHOW, DROP, ALTER

-- 데이터 베이스 생성
CREATE DATABASE testmysql;

-- 데이터 베이스 확인
SHOW DATABASES;

-- 데이터 베이스 제거
DROP DATABASE testmysql;

-- 사용할 데이터 베이스 지정
USE testmysql;

-- 데이터 베이스 안에 있는 테이블 확인
SHOW TABLES;

-- 테이블 생성
CREATE TABLE store(
    id INT AUTO_INCREMENT PRIMARY KEY,
    tel VARCHAR(20)
);
-- PRIMARY KEY는 테이블 당 하나만 가능. 이름 그대로 고유값

-- 테이블에서 필드명과 타입을 확인할 수 있는 명령어
DESC store;

-- 데이터 타입 : 숫자형, 문자형, 날짜형, 이진 데이터 타입

-- 숫자형 
-- INT : 4byte ~ 21억

-- 문자형
-- VARCHAR : 255byte - 가변데이터(우리가 선언한 범위보다 작으면 본인이 알아서 맞춰준다.)
-- CHAR : 255byte - 고정데이터(선언한 범위를 다 사용한다. 범위보다 작아도 빈칸으로 남겨둔다.)
-- TEXT : 65535byte

-- 날짜형
-- DATE : 년 월 일
-- TIME : 시간
-- DATETIME : 년 월 일 시간 (YYYY-MM-DD-HH:MM:SS)
-- TIMESTAMP : 년 월 일 시간 (INTERGER) 4byte

-- 이진 데이터 타입 (잘 사용하지 않는다.)
-- BLOB : 이미지

-- KEY
-- PRIMARY KEY : 중복 입력 안됨, 테이블 당 하나만 들어갈 수 있다. null 값도 들어가지 않는다.
-- UNIQUE : 중복 입력이 불가하지만 키를 여러개 줄 수 있다. null값도 들어갈 수 있다.

CREATE TABLE user(
    user_id VARCHAR(20) PRIMARY KEY,
    -- NOT NULL : NULL 값이 들어가면 안된다는 설정
    user_pw VARCHAR(20) NOT NULL,
    user_name VARCHAR(20) NOT NULL,
    -- DEFAULT : 따로 추가한 값이 없다면 DEFAULT 뒤에 작성되어있는 기본값을 추가해 준다. 
    gender CHAR(4) DEFAULT "남자",
    -- now() : 현재 시간을 만들어주는 함수
    data DATETIME DEFAULT now()
);

DESC user;

-- 데이터 조작어
-- SELECT
-- INSERT
-- UPDATE
-- DELETE

-- 테이블에 값 추가 VALUES 뒤에 ()를 더 추가로 작성하면 값이 연속으로 들어간다.
INSERT INTO user(user_id,user_pw,user_name,gender)VALUES("rere1",'pw123','koo','남자');

SELECT * FROM user;

-- INSERT INTO user(user_id,user_name)VALUES("1234","koo");

-- 테이블 열 검색
-- WHERE문으로 테이블을 조회해서 해당 필드가 일치하는 값을 찾아서 조회
SELECT * FROM user WHERE user_id="rere1";
SELECT * FROM user WHERE gender="남자";

-- 테이블 열 수정
-- SET : 해당 값을 수정할 때 사용, UPDATE문과 자주 사용된다.
UPDATE user SET gender="여자" WHERE user_id="rere1";

UPDATE user SET user_pw = "0000", user_name = "koo2", gender = "남자" WHERE user_id="rere1";

-- 테이블 삭제
DELETE FROM user WHERE user_id="rere1";

-- 게시판 테이블 만들기
-- 컬럼 : id, content, writer, date, likes
-- id = INT 11자리 고유키 자동증가
-- content = text 타입 null이어도 추가 가능
-- writer = VARCHAR타입 40자 null 안되게
-- likes = INT 11자 기본값 0
-- row 6개 추가
-- 테이블 이름 border

CREATE TABLE border(
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    writer VARCHAR(40) NOT NULL,
    date DATETIME DEFAULT now(),
    likes INT(11) DEFAULT 0
);

SELECT * FROM border;

INSERT INTO border (content, writer)VALUES("1번 게시물","koo1");
INSERT INTO border (content, writer)VALUES("2번 게시물","koo2");
INSERT INTO border (content, writer)VALUES("3번 게시물","koo3");
INSERT INTO border (content, writer)VALUES("4번 게시물","koo4");
INSERT INTO border (content, writer)VALUES("5번 게시물","koo5");
INSERT INTO border (content, writer)VALUES("6번 게시물","koo6");

-- SELECT 필드1, 필드2 FROM [테이블 명] : 필드1, 필드2에 대한 테이블 전체 조회
SELECT id,writer FROM border;

-- SELECT * FROM [테이블명] WHERE [필드] LIKE "%AB" : 필드에 해당되는 내용 중에 AB로 시작하는 데이터 조회
-- SELECT * FROM [테이블명] WHERE [필드] LIKE "AB%" : 필드에 해당되는 내용 중에 AB로 끝나는 데이터 조회
-- ALTER TABLE [기존 테이블명] RENAME [새로운 테이블명] : 테이블 이름 바꾸기
ALTER TABLE user2 RENAME user3;

-- ALTER TABLE [테이블명] CHANGE [기존 컬럼명][새로운 컬럼명] Type : 컬럼 이름 바꾸기
ALTER TABLE user3 CHANGE user_pw newcol VARCHAR(20);

-- ALTER TABLE [테이블명] MODIFY [컬럼명] TYPE : 컬럼의 타입을 변경
ALTER TABLE user3 MODIFY newcol CHAR(10);

-- DELETE FROM [테이블명] WHERE [필드값] = "값" : 조건에 맞는 모든 값 삭제
-- ALTER TABLE [테이블명] DROP [필드명] : 해당 필드를 테이블에서 제거
-- ALTER TABLE [테이블명] AUTO_INCREMENT = 0, 1 : 해당 테이블의 AUTO_INCREMENT를 초기화 시켜준다.
-- ALTER TABLE [테이블명] ADD [필드명] TYPE : 해당 테이블 맨 뒤에 필드를 추가해준다.
-- ALTER TABLE [테이블명] ADD [필드명] TYPE first : 해당 테이블 맨 앞에 필드를 추가해준다.

CREATE TABLE user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20)
);

CREATE TABLE posts(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(20)
);

SHOW TABLES;

ALTER TABLE posts ADD COLUMN userID INT;
DESC posts;

-- ADD CONSTRAINT : 제약 조건 명령어 (오류가 나면 확인하기 위해 사용)(임의 지정 가능)
-- FOREIGN KEY : 참조할 키 지정 
-- REFERENCES : 참조키가 참조하는 테이블의 열을 지정
ALTER TABLE posts ADD CONSTRAINT fk_user FOREIGN KEY (userID) REFERENCES user (id);

INSERT INTO user (name)VALUES("DD");
INSERT INTO posts (title,userID)VALUES("122231",3);

-- INNER JOIN 테이블을 조회하는데 참조키를 가지고 관계가 맺어져 있는 테이블 조회
SELECT * FROM user INNER JOIN posts ON user.id = posts.userID WHERE user.id = 3;
SELECT user.id,posts.title FROM user INNER JOIN posts ON user.id = posts.userID WHERE user.id = 2;

-- SELECT * FROM [테이블명] ORDER BY [필드명] DESC | ASC : 필드명 기준으로 내림차순(DESC), 오름차순(ASC)로 정렬