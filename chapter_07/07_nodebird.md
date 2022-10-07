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

회원가입 라우터 작성
routes/auth.js작성
-  bcrypt.hash 로 비밀번호 암호화
-  hash의 두번 째 인수는 암호화 라운드
-  라운드가 높을 숭록 안전하지만 오래걸림
-  적당한 라운드를 찾는게 좋음
-  ?error 쿼리스트링으로 1회성 메시지

#### 7.2 multer로 이미지 업로드 구현하기
form 태그의 enctype이 multipart/form-data
multer패키지 필요 -> bodyparser로는 요청 본문을 해석할 수 없음
```zsh
$npm i multer
```
이미지를 먼저 업로드하고, 이미지가 저장된 경로를 반환할 것임
게시글 form을 submit 할 때는 이미지 자체 대신 경로를 전송

**이미지 업로드 라우터 구현**

#### 7.3 게시글 업로드 구현하기

**팔로잉 기능 구현**

**게시글 업로드 기능 구현**

**해시태그 등록 기능 구현**

**해시태그 라우터 추가**