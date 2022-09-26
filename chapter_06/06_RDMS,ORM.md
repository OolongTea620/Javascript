## 6. 데이터베이스

### 1. 데이터베이스
chapter_05 까지는 데이터를  서버 메모리에 저장함    
즉, **서버를 재시작**하면 **데이터도 사라져** 버림      
영구적으로 저장할 공간 필요

#### MySQL 관계형 데이터 베이스 사용
- 데이터베이스 : 관련성을 가지며 중복이 없는 데이터들의 집합
- DBMS : 데이터베이스를 관리하는 시스템
- RDBMS : 관계형 데이터베이스를 관리하는 시스템
- 서버의 하드 디스크나  SSD 등의 저장 매체에 데이터를 저장
- 서버 종료 여부와 상관없이 데이터를 계속 사용할 수 있음
- 여러 사람이 동시에 접근할 수 있고 권한을 따로 줄 수 있음


    RDBMS : 항목화 되어있고 정형화된 데이터를 저장 시
    NoSQL : 정형화 되지 않은 데이터 저장시

#### Mysql  설치하기

```zsh
$mysql -h localhost -u root -p
Enter password : [비밀번호 입력]
>mysql
```
-h는 호스트, -u는 사용자, -p는 비밀번호 의미

```zsh
$mysql -h localhost -u root -p
Enter password : [비밀번호 입력]
>mysql
```

#### workbench 설치하기 

linux
```zsh

```

#### workbench 와 MYSQL을 연결하기 위한 유저 만들기

#### 1. root mysql 실행하기
```zsh

```
#### 2. user 만들기
```SQL
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
```
#### workbench로 DB 접속하기

#### 데이터 베이스 만들기
```SQL
CREATE DATABASE [데이터 베이스명] default CHARACTER SET UTF8;
``` 
#### DB 사용하기
```SQL
USE [데이터베이스명];
```
#### Table 생성하기 
```SQL
/*user 테이블 만들기*/
CREATE TABLE nodejs.users( 
id INT NOT NULL AUTO_INCREMENT, 
name VARCHAR(20) NOT NULL,
age TINYINT UNSIGNED NOT NULL,
married TINYINT NOT NULL,
comment TEXT NULL,
created_at DATETIME NOT NULL DEFAULT now(), 
PRIMARY KEY(id), 
UNIQUE INDEX name_UNIQUE (name ASC)
) 
COMMENT = '사용자 정보' 
DEFAULT CHARACTER SET =utf8
ENGINE = InnoDB;

/*comments 테이블 만들기*/
CREATE TABLE nodejs.comments( 
id INT NOT NULL AUTO_INCREMENT, 
commenter INT NOT NULL, comment VARCHAR(100) NOT NULL, 
created_at DATETIME NOT NULL DEFAULT now(), 
PRIMARY KEY(id), 
INDEX commenter_idx (commenter ASC),
CONSTRAINT commenter FOREIGN KEY (commenter) 
REFERENCES nodejs.users(id) ON DELETE CASCADE ON UPDATE CASCADE
) 
COMMENT = '댓글' 
DEFAULT CHARSET=utf8mb4 
ENGINE=InnoDB;

commit;

```
### CRUD
#### Create
```SQL
INSERT INTO 데이터베이스명.테이블명 (컬럼1, 컬럼2, 컬럼3 ...) VALUES (컬럼1 값, 컬럼2 값, 컬럼3 값...)
```
#### READ
```SQL
/*'*' 모든항목 모든 컬럼*/
SELECT * FROM nodejs.users;  

/* ORDER BY 컬럼 DESC/ASC
DESC 내림차순 ASC 오름차순*/
SELECT * FROM nodejs.users ORDER BY id ASC;
/* LIMIT 컬럼수 : 컬럼수 만큼 로우 출력*/
SELECT * FROM nodejs.users ORDER BY age ASC LIMIT 10;

/* OFFSET 갯수: 갯수 만큼 앞의 튜플 스킵 */
SELECT * FROM nodejs.users ORDER BY age DESC OFFSET 1;
```
#### UPDATE
```SQL
/*조건이 없으면 해당 테이블의 지정 컬럼 값이 수정내용으로 모두 바뀜*/
UPDATE 테이블명 SET 컴럼명=수정내용 WHERE 조건;
```

#### DELETE
```SQL
DELETE FROM 테이블명 WHERE 조건;
```

### 1. 시퀄라이즈 ORM
MySQL 작업을 쉽게 할 수 있도록 도와주는 라이브러리

#### **ORM**(Object Relational Mapping)
객체와 데이터를 매핑 (1:1 짝지어줌)     
MySQL 외에 다른 RDB(MariaDB, PostgreSQL SQLite, MSSQL)와도 호환됨
자바스크립트 문법으로 데이터베이스 조작가능

### 시퀄라이즈 ORM
[시퀄라이즈 예제 주소](https://github.com/ZeroCho/nodejs-book/tree/master/ch7/7.6/learn-sequelize)
프로젝트 셋팅 후 콘솔 경로를 통해 package.json 작성

#### 1. sequelize-cli 설치
```zsh
$npm i express morgan nunjucks sequelize sequelize-cli mysql2
```
mysql2는 MySQL DB가 아닌 드라이버(Node.js 와 MySQL을 이어주느 역할) 

#### 2. 명령어로 시퀄라이즈 구조 생성
```zsh
$npx sequelize init
```
루트 폴더 안에  

public, routes, views 이름으로 폴더 생성
### 3. models/index.js 수정
require 설정로딩    
new Sequelize(옵션들..)로 DB와 연결 가능

models/index.js 내부의 내용을 전부 지우고 다음과 같이 작성

```javascript
/**
 * MySQL 과 Sequelize를 연결해주는 코드
 */
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;

module.exports = db;

```

### 모델 생성
./models/user,js,
./models/comment.js 참고하기

### 관계 정의하기


**1 : N 관계**     
users 모델과 comments 모델간의 관계를 정의
(사용자 한 명이 댓글 여러 개 작성)
- 시퀄라이즈에서는 1:N관계를 hasMany로 표현(사용자.hasMay(댓글))
- 반대의 입장에서는 belongsTo(댓글.belongsTo(사용자))
- **belongsTo가 있는 테이블에 컬럼이 생김**(댓글 테이블에 commenter 컬럼이 생김)

**1 : 1 관계**    
users 모델과 Info 모델간의 관계를 정의
사용자 테이블과 사용자 정보 테이블    
- **belongsTo가 쓰인 모델 테이블**(INFO)에 "UserID"라는 **외래키가 추가**된다.
```javascript
db.User.hasOne(db.Info, {foreignKey : "UserID" , sourceKey : "id"});

db.Info.belongsTo(db.User, {foreignKey : "UserID" , targetKey : "id"})
```

**M : N 관계**    
게시글과 해시태그 테이블
하나의 게시글이 여러 개의 해시태그를 가질 수 있고 하나의 해시태그가 여러개의 게시글을 가질 수있다.

DB 특성상 다대다 관계는 중간 테이블이 생성됨
```javascript
db.Post.belongsToMany(db.HashTag, {through: "PostHashTag"}); 

db.HashTag.belongsToMany(db.Post, {through: "PostHashTag"});

/*
* through 속성값 "PostHashTag"라는 이름의 테이블이 생성되고 (through의 속성 값) 자동으로
postId (Post id를 참조하는 외래키)
hashtagId ( HashTag id 를 참조하는 외래키)
컬럼이 추가된다.
*/
```
- belongsTo 키워드 사용(양측 다)
- 중간테이블 이름만 사용하면 된다.

## 시퀄라이즈 쿼리 알아보기
### 삽입, 조회
```javascript
/*
* Insert into nodejs.users (name, age, married, comment) Values ('zero',24,0,'자기소개1')
*/
const {User} = require("../models");

User.create({
  name : 'zero',
  age : 24,
  married : false,
  comment : "자기소개1",
});

/*
* Select * From nodejs.users;
*/
User.findAll({});

/*
* Select name, married From nodejs.users;
*/
User.findAll({
  attributes : ['name', 'married'],
});
/*
* 특수한 기능들인 경우 Sequelize.Op의 연산자 사용(gt, or 등)
*/

/*
* Select name, age From nodejs.users Where married = 1 And age > 30;
*/
const {Op} = require("sequelize");
const {User} = require("../models");
User.findAll({
  attributes: ['name', 'age'],
  where : {
    married :1,
    age : {[Op.gt]: 30},
  },// 'and'연산의 경우 같이 나열 
});

/*
* Select id, name From nodejs.users Where married = 0 OR age > 30;
*/

/*
*  Op :  Operator(연산자) : object
*/
const {Op} = require("sequelize");
const {User} = require("../models");
User.findAll({
  attributes: ['name', 'age'],
  where : {
    [Op.or]: [{married : 0}, {age : {[Op.gt]: 30}}],
  },
});

/*
* gt -> '>'
* lt -> '<'
* gte -> '>='
* lte -> '<='
* in [값1, 값2, 값3, ...]-> 값1, 값2, 값3 중에 있는지?
* ne -> not equal  : 가 아니다.
*/

/*
* Select id, name From nodejs.users Order By age DESC;
*/
User.findAll({
  attributes: [id, name],
  order :[['age','DESC']],
  // 2차원 배열로 정렬. 만약 다른 요소도 정렬에 반영하고 싶다면 oder : [['age','DESC'], ['createdAt', 'ASC']]
});

/*
 * Select id, name From nodejs.users order by DESC Limit 1;
*/
User.findAll({
  attributes:['id', 'name'],
  order [['age','DESC']],
  limit : 1,
});

/*
 * Select id, name From nodejs.users order by DESC Limit 1 Offset 1;
*/
User.findAll({
  attributes:['id', 'name'],
  order [['age','DESC']],
  limit : 1,
  offset : 1,
});
```
### 수정
```javascript
/*
* Update nodejs.user SET comment = '바꿀 내용' Where id = 2;
*/
User.update({
  comment : '바꿀내용',
},{
  where : {id : 2},
});
```
### 삭제
```javascript
/*
* Delete From nodejs.users Where id = 2; 
*/
User.destroy({
  where : { id : 2},
});

/**
 *Delete from nodjs.users Where id = 1 or id = 3 or id= 5;
*/
User.destroy({
  where : [ id : {[[Op.in] : [1,3,5]]}]
});
```

## 관계 쿼리

결과값이 자바스크립트 객체임
```javascript
const user = await User.findOne({});
console.log(user.nick); // 사용자 닉네임
```
include로 JOIN과 비슷한 기능 수행 가능(관계 있는 것 엮을 수 있음)
```javascript
const user = await User.findOne({
  include: [{
    model : Comment,
  }]
});
console.log(user.Comments); // 사용자 댓글
//Comments인 이유는 일대다 관계 (유저 : 댓글) 관계이기 때문에 **복수형**
```
다대다 모델은 다음과 같이 접근 가능
```javascript
/*
* model/
*/
db.Post.belongsToMany(db.HashTag, {through: "PostHashTag"}); 
...

/* 모델 선언 시 사용했던 through 키워드를 사용한다.*/
db.sequelize.models.PostHashtag
```

get+[모델명]으로 관계있는 데이터 로딩 가능
```javascript
const user = await User.findOne({});
const comments = await user.getComments();// 일대다 관계라 관계라서 자동으로 복수형으로 쓰여짐
```
as로 모델명 변경 가능
```javascript
// 관계설정할 때 as로 등록
db.User.hasMany(db.Comment, { foreignKey:'commenter', sourceKey: 'id'm as: 'Answers'});
// 쿼리 할 때 
const user = await User.findOne({});
const comments await user.getAnswers();
console.log(comments);// 사용자 댓글
```
include나 관계 쿼리 메서드에서도 where나 attributes 지정가능
```javascript
/*
* comment id 가 1인 것을 찾는것
*/
const user = await User.findOne({
  include: [{
    model : Comment,
    where : {
      id : 1
    },
    attributes : ['id'],
  }]
});
// 또는
const comments = await user.getComments({
  where : {
    id : 1,
  },
  attributes : ['id'],
});
```
생성 쿼리
```javascript
// add[모델명] 미리 만들어줌
const user = await User.findOne({});
const comment = await Comment.create();
await user.addComment(comment);

//또는 
await user.addComment(comment.id); //미리 유저 아이디를 생성
```
여러개를 추가할 때는 배열로 추가가능
```javascript
const user = await User.findOne({});
const comment1 = await Comment.create();
const comment2 = await Comment.create();
await user.addComment([comment1,comment2]);
```

수정은 set+[모델명], 삭제는 remove모델명

직접 SQL을 쓸 수 있음
```javascript
const [result, metadata] = await sequelize.query('SELECT * from Comments');
console.log(result);
```
