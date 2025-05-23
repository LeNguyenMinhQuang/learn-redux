let a = (function* run() {
    yield "1";
    yield "2";
    yield "3";
    yield "4";
    yield "5";
    return "Hello World";
})();

console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
