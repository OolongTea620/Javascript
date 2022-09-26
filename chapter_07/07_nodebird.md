# 노드 버드 프로젝트 만들기

## 기능 설명
로그인
이미지 업로드
게시글 작성
해시태그 검색
팔로잉

## 사용 라우터

## 프로젝트 빌드 순서
### 1. npm init,  npm 라이프러리 설치하기 
```zsh
$ npm i ...
```
Sequelize 기본 구조 생성
```zsh
$ npx sequelize init
```
### 2. .env 생성, 기본 값 설정하기
COOKIE_SECRET=cookiesecret

### 3. 사용 폴더 생성
'/(루트)' 경로 기준으로 "public", "routes", "views" 폴더 생성

### 4. app.js, views/*.html 작성

### 5. 모델 작성(Sequelize)


### 6. 데이터 베이스 연결 
6.1 MySQL접속 뒤,  데이터베이스 스키마 생성
```SQL
CREATE DATABASE [데이터베이스명] default CHARACTER SET UTF8;
```
### 7. 기능 작성
#### 7.1 Passport 모듈로 로그인 기능 만들기

로그인 과정을 쉽게 처리할 수 있도록 도와주는 Passport 설치하기

- 비밀번호 암호화를 윈한 bcrypt도 같이 설치
- 설치 후 app.js와도 연결
- passport.initialize(): 요청 객체에 passport 설정을 심음
- passport.session() : req.session 객체에 passport 정보를 저장
- express-session 미들웨어에 의존하므로 이보다 더 뒤에 위치해야함

```zsh
$npm i passport passpor
t-local passport-kakao bcrypt
```
**로그인 과정**
1. 로그인 요청이 들어옴
2. passport authenticate 메서드 호출
3. 로그인 전략 수행(나중에 알아봄)
4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
5. req.login 메서드가  passport.serializeUser 호출
6. req.session에 사용자 아이디만 저장
7. 로그인 완료

**로그인 이후 과정**
1. 모든 요청에 passport.session() 미들웨어가 passport.deserializeUser 메서드 호출
2. req.session에 저장된 아이디로 데이터 베이스에서 사용자 조회
3. 조회된 사용자를 req.user에 저장
4. 라우터에서 req.user 사용가능