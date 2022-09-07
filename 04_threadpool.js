const crypto = require("crypto");

const pass = "pass";
const salt = "salt";
const start = Date.now();

crypto.pbkdf2(pass, salt, 10000, 128, "sha512", () => {
  console.log("1", Date.now() - start);
});
// 노드는 보통 4개씩 동시에 돌린다.

// 커스텀 이벤트 예제
const EventEmitter = require("events");

const myEvent = new EventEmitter();

myEvent.addListener("event1", () => {
  console.log("이벤트");
});
myEvent.on("event2", () => {
  console.log("이벤트2");
});
myEvent.on("event2", () => {
  console.log("이벤트2 추가");
});
myEvent.once("event2", () => {
  console.log("이벤트3");
}); // 한번만 실행되는 이벤트

myEvent.emit("event1"); //이벤트 호출
myEvent.emit("event2");

myEvent.emit("event3"); // 이벤트 호출
myEvent.emit("event3"); // 실행 안됨

myEvent.on("event4", () => {
  console.log("이벤트4");
});
myEvent.removeAllListeners("event4"); // 'event4'와 등록된 이벤트 제거됨
myEvent.emit("event4"); //실행안됨

const listener = () => {
  console.log("이벤트 5");
};
myEvent.on("event5", listener);
myEvent.removeAllListeners("event5", listener);
myEvent.emit("event5"); // 실행 안됨

// 'event2' 가 등록된 갯수
console.log(myEvent.listenerCount("event2"));
