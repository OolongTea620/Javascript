# 패키지 매니저

## 1. npm
**Node Package Manager**    
노드의 패키지 매니저

- 다른 사람들이 만든 소스들을 모아둔 저장소(대충 백만개)
- 남의 코드를 사용하여 프로그래밍 가능
- 이미 있는 코드를 사용하여 프로그래밍 가능
- 이미 있는 기능을 다시 구현할 필요없어 효율적
- 오픈 소스 생태계를 구성중

용어 
- 패키지 : npm에 업로드된 노드 모듈
- 모듈이 다른 모듈을 사용할 수 있듯이 패키지도 다른 패키지를 사용할 수 있다(의존 관계)

### package.json
현재 프로젝트에 대한 정보와 사용중인 패키지에 대한 정보를 담은 파일
- 같은 패키지라도 버전별로 기능이 다를 수 있으므로 버전을 기록해두어야 함
- 동일한 버전을 설치하지 않으면 문제가 생길 수 있음
- 노드 프로젝트 시작 전 package.json부터 만들고 시작해야함(npm init)

### package.json 속성들
package.name : 패키지 이름
version: 패키지의 버전 npm의 버전은 다소 엄격하게 관리된다.     
entry point: 자바 스크립트 실행 파일 진입점. 보통 마지막으로 module.export하는 파일을 지정. package.json의 main 속성에 저장됨   
test command: 코드를 테스트할 때 입력할 명령어를 의미한다.  
git repository : 코드를 저장해둔 Git 저장소 주소를 의미     
keywords: 키워드는 npm 공식 홈페이지에서 패키지를 쉽게 찾을 수 있게 해줌     
license : 해당 패키지의 라이선스

### npm 명령어
``` zsh
$ npm i [패키지명]
```

```zsh
$ npm i -D [패키지명] // -D 옵션 : 개발용으로 패키지 다운, 배포시에는 해당 패키지가 포함되어 있지 않음
```
### 기타 npm 명령어
npm outdated: 어떤 패키지에 기능 변화가 생겼는지 알 수 있음

npm ls: 설치된 라이브러리와 버전 보기
```zsh
$ npm ls
```
-패키지 삭제
```zsh
$ npm uninstall 패키지명
$ npm rm 패키지명 // 이렇게도 가능
```
- 패키지 검색 : npm 패키지 검색할 수 있음 (npmjs.com 에서도 가능)
```zsh
$ npm search 검색어 
```
- npm info 패키지명: 패키지의 세부 정보 파악 가능
```zsh
$ npm info 패키지명 
```
- npm adduser: npm에 로그인을 하기 위한 명령어(npmjs.com 에서 회원가입)
```zsh
$ npm adduser 
```
- npm whoami:현재 사용자가 누구인지 알려줌
```zsh
$ npm whoami
```
- npm logout:로그인한 계정을 로그아웃
```zsh
$ npm logout
```
- npm version 버전: package.json 의 버전을 올림
```zsh
$ npm version 버전
```
- npm decrecate [패키지명][버전][메시지]: 패키지를 설치할 때 경고 메시지를 띄우게 함(오류가 있는 패키지에 적용)
```zsh
$ npm decrecate [패키지명][버전][메시지]
```
- npm publish: 자신이 만든 패키지를 배포
```zsh
$ npm publish
```

- npm unpublish: 자신이 만든 패키지를 배포중단(배포 뒤 72시간 내에만 가능)
```zsh
$ npm unpublish

## 패키지 버전 이해하기
### 1. SemVer 버저닝
노드 패키지의 버전은 SemVer(유의적 버저닝)방식을 따름
- Major(주 버전), Minor(부 버전), Patch(수 버전)
- 노드에서 배포를 할 때는 항상 버전을 올려야 함
- Major: 하위 버전과 호환되지 않은 수정 사항이 생겼을 때 올림
- Minor: 하위 버전과 호환되는 수정 사항이 생겼을 때 올림
- Patch: 기능에 버그를 해결했을 때 올림 

### 2. 버전기호 사용하기
- 버전 앞에 기호를 붙여 의미를 더함
- ^1.1.1: 패키지 업데이트 시 minor 버전까지만 업데이트됨(2.0. 0 불가능)
- ~1.1.1: 패키지 업데이트 시 patch 버전까지만 업데이트됨(1.2.0 버전은 안됨)
- <=, >=, <, >는 이하 이상 미만 초과
- @latest는 최신을 의미
- @next로 가장 최신 배포판 사용 가능(불안정함)
- 알파/베타/RC 버전이 존재할 수 있음(1.1.1-alpha.0, 2.0.0-beta.1, 2.0.0-rc.0)   
