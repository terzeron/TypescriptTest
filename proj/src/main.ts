function hello(compiler: string) {
    console.log(`Hello from ${compiler}`);
}

hello("Typescript");

import pet = require("./pet");
pet.feedPets(["cat", "dog", "goat"])

function myCoolFunction1(f: (x: number) => void, nums: number[]): void {}
function myCoolFunction2(f: (x: number) => void, ...nums: number[]): void {}
function myCoolFunction3() {
    if (arguments.length == 2 && !Array.isArray(arguments[1])) {
        var f = arguments[0];
        var arr = arguments[1];
        // ...
    }
}

let options = {
    color: "red",
    volueme: 11
};

interface Options { color: string; volume: number }
let options2 = {} as Options;
options2.color = "red";
options2.volume = 11;

// in struct null checking mode, null & undefined are different
// tsc --strictNullChecks
let bar = undefined;
bar = null;

// ! operator
// 아래 코드에서 str이 null일 수도 있지만 string 타입일 경우에 .substring()이나 .length를
// 사용할 수 있도록 ! operator를 후위에 붙여서 호출 가능함
function split(str: string | null) {
    let checkString = function() {
        if (str == null || str == undefined) {
            str = "test";
        }
    }
    checkString();
    return str!.substring(0, str!.length / 2);
}
let s = split("bean");
console.log(s);
let s2 = split(null);
console.log(s2);

// this에 대한 암시적 any 피하기 (No Implicit any for this)
class Point {
    constructor(public x: number, public y: number) {}
    getDistance(p: Point) {
        let dx = p.x - this.x;
        let dy = p.y - this.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }
}
interface Point {
    distanceFromOrigin(point: Point): number;
}
Point.prototype.distanceFromOrigin = function() {
    return this.getDist111ance(new Point(0, 0)); // no error even if misspelled
}
Point.prototype.distanceFromOrigin = function(this: Point) {
    //return this.getDistance({x: 0, y: 0}); // error
    return this.getDistance(new Point(0, 0));
}