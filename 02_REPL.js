/* 여기에 주석 */
// 한 줄 주석

function hellogworld () {
    console.log("hello world!")
}
hellogworld();

const odd = "홀수인데요...";
const even = "짝수입니다...";

module.exports = [ //다른 js파일에서 해당 변수를 사용할 수 있도록 해주는 역할
    odd,
    even
]; 