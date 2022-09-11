const {odd, even} = require('./02_REPL'); //상대 경로 입력

function checkOddOrEven(number) {
    if (number % 2){
        return odd;
    } else {
        return even;
    }
}
module.exports = checkOddOrEven; //파일에서 단 한번만 사용 가능하다