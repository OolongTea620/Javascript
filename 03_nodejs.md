## 3. 파일 시스템 접근하기

### **1. fs**
파일 시스템에 접근하는 모듈    

파일/폴더 생성, 삭제, 읽기, 쓰기 기능   

웹 브라우저에서는 제한적이였으나,   
 노드는 권한을 가지고 있음  

ex)
```javascript
const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});
```
> 해당 결과를 실행하면   바이너리,버퍼    
> (컴퓨터가 읽을 수 있는 0,1의 데이터)로 반환   

> promises 방식으로 선언되기도 한다.
> ```javascript
> const fs = require('fs').promises;
> fs.readFile('./README.md')
>   .then((data) => {
>       console.log(data);
>       console.log(data.toString());
>   })
>   .catch( (err) => {
>       throw err;
>   }); 
> 
> ```
동기/비동기
blocking/Non-blocking