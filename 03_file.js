/*# 3_nodejs 파일예제 */

const { setFips } = require('crypto');

// ## 1. 파일 읽기
const fs = require('fs').promises;

fs.readFile('./README.md')
    .then((data) => {
       console.log(data);
       console.log(data.toString());
    })
    .catch((err) => {
       throw err;
    }); 

// ## 2. 파일 생성하기
fs.writeFile('writeme.txt', "노드 학습을 합시다!")
.then(() => {
    return fs.readFile('./writeme.txt');
})
.then((data) => {
    console.log(data.toString());
})
.catch((err) => {
    throw err;
})