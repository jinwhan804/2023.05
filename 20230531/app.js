// 웹 서비스를 개발을 하고 완료되면 배포해서 사용자에게 소프트웨어 전달을 해야함
// 배포하기위해 필요한게 제3자가 접속할수있는 서버 컴퓨터가 필요함
// 365일 내내 24시간 켜져있어야하는데

// 서버 컴퓨터를 대여해주는 호스팅 업체를 통해 배포를 진행한다
// 호스팅에는 두가지로 나뉘는데 (1. 서버 호스팅)(2. 웹 호스팅)
// 1. 서버호스팅 : 물리 서버를 단독으로 임대 및 구매
// 2. 웹 호스팅 : 서버의 일부 공간을 임대하는 개념 (컴퓨터를 잘게 쪼갠거라고 보면됨)
//        장점 : 서버나 인프라 구축이 필요없고 비용이 저렴
//        단점 : 자원이 한정적 / 단독서버에 비해 사용량이 제한적임

// 웹 호스팅 업체중 하나인 AWS 통해서 서버를 배포할것

// laaS : 컴퓨터 자원만 제공하는 형태 (AWS) Infrastucture as a service
// Paas : 헤로쿠 등 넷플리파이 등 기존 환경에서 서비스를 올려주는 형태

// 인스턴스 만들기 전에 오른쪽 상단에 리전 확인 서버컴퓨터가 가깝게 설정
// 인스턴스의 사용 운영체제 선택
// 우리가 사용할 Os 는 우분투 프리티어
// 키페어잘 보관하기 혹시나 전달해야할 경우 저장매체 사용 유에스비

// ssh tcp 프로토콜 포트 범위 32

//---------------------------------
// ls -a

// 인스턴스에 mysql 설치

// mysql 설치 명령어
// sudo apt-get update

// sudo apt-get install mysql-server

// sudo mysql -u root -p
// 비밀번호 없음 그냥 엔터치기
//---------------------------------
// 데이터 베이스 세팅
// 우리가 사용할 데이터베이스 하나 만들어 보자
// 쿼리문 그대로 사용해서 만들자
// create database test;

// show databases;

// 데이터베이스를 사용할때 우리가 사용할 유저를 만들어주자
// 사용할 유저 생성
// create user '여기에 유저 이름'@'%' identified by '여기에 사용할 비밀번호'

// 만든 유저에게 권한 설정
// grant all on 데이터 베이스 이름.(데이터베이스 이름 뒤에 점)* to '유저 이름'@'%';

// 권한 주어졌는지 확인
// show grants for '여기유저이름';

//---------------------------------
// 외부에서 mysql 서버 만들어줌
// 외부에서 인스턴스의 Mysql 에 접속을 해보자

// 다시들어가서 비밀번호 치고 들어가기
// sudo service mysql restart;
// mysql -u admin -p
// 12341234

// 보안그룹에 mysql을 허용
// mysql 외부 접근 허용
// sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf;
// i or insert 누르기
// 파일을 열고 i 눌러서 수정모드 진입
// 0.0.0.0
// esc 눌러서 풀고
// :wq! : 저장후 종료
// :q! : 종료
// :w! : 강제저장

// -----------------------------------
// mysql 에서 connection 만들고
// AWS 에서 퍼블릭 IPv4 DNS 복사 해서 host 에 입력
// test connection 하고 ok 하기

// 프로젝트 설치 받자
// git 에 올린 프로젝트를 설치
// node js 설치
// sudo apt-get update
// sudo apt-get install -y build-essential
// sudo apt-get install curl
// 원하는 노드 버전을 적어주면 된다
// curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash --

// nodejs 설치합니다
// sudo apt-get install -y nodejs

// node 버전 확인 node -v
// npm 버전 확인 npm -v

// vi로 파일 확인
// :q!로 종료

// 포트 포워딩을 해서 포트 80 http로 접속했을 때 8080포트로 재 매핑 하는 방법
// sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080;
// --dport 80 : 80 포트 접속했을 때
// --to-port 8080 : 8080 포트로 재 매핑

// 포트 포워딩 확인 명령어
// sudo iptables -t nat -L --line-numbers

// 포트 포워딩 삭제 명령어
// sudo iptables -t nat -D PREROUTING 인덱스 번호

// pm2 : VScode에서 서버 대기 종료를 시켜도 백그라운드에서 대기 시키기 위해서 필요한 모듈
// 이렇게 할 경우 package.json 에서 실행 스크립트를 node app.js로 해두는대 이 부분을 pm2 start app.js로 바꿔준다.
// 서버 종료 시에는 npx pm2 kill 적용
// 리스트 확인은 npx pm2 list