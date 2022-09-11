const {odd, even} = require('./02_REPL');
const checkNumber = require('./02-1_make_module');

function checkStringOddOrEven(str) {
    if (str.lenth % 2){
        return odd;
    } else {
        return even;
    }
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));
