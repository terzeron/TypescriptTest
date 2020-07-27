function test2_1() {
    function f() {
        var a = 10;
        return function g() {
            var b = a + 1;
            return b;
        }
    }

    var a = 10;
    var g = f();
    console.log("g()=" + g());
}

function test2_2() {
    function f2() {
        var a = 1;
        a = 2;

        console.log("a=" + a + " before b=g()");
        var b = g();
        a = 3;
        console.log("a=" + a + " after b=g()");

        return b;

        function g() {
            return a;
        }
    }

    console.log("f2()=" + f2());
}

function test2_3() {
    function f(shouldInitialize: boolean) {
        if (shouldInitialize) {
            var x = 10;
        }

        // undefined
        return x;
    }

    console.log("f(true)=" + f(true));
    console.log("f(false)=" + f(false));
}

function test2_4() {
    function sumMatrix(matrix: number[][]) {
        var sum = 0;

        for (var i = 0; i < matrix.length; i++) {
            var currentRow = matrix[i];
            for (var i = 0; i < currentRow.length; i++) {
                // 컴파일 오류는 아니지만 i가 재선언되어 overwrite됨 
                // i overwrite another variable i with same name
                sum += currentRow[i];
            }
        }

        return sum;
    }

    var matrix: number[][] = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];
    console.log("sumMatrix(matrix)=" + sumMatrix(matrix));
}

function test2_5() {
    for (var i = 0; i < 5; i++) {
        // setTimeout의 callback은 for loop이 끝난 다음에 실행되므로 i는 항상 5
        setTimeout(function () {
            console.log("i=" + i);
        }, 10 * (i + 1));
    }
    // 이 예제를 var 대신 let으로 고쳐서 실행한다면 i의 값이 환경에 캡쳐됨
    for (let i = 0; i < 5; i++) {
        setTimeout(function () {
            console.log("i=" + i);
        }, 100 * (i + 1));
    }

    for (var i = 0; i < 5; i++) {
        // IIFE: Immediately Invoked Function Expression
        (function (i) {
            setTimeout(function () {
                console.log("i=" + i);
            }, 1000 * (i + 1));
        })(i);
    }
}

function test2_6() {
    function f(input: boolean) {
        let a = 100;

        if (input) {
            // let으로 선언하면 block scope임   (for, if, try catch 등)
            let b = a + 1;
            return b;
        }

        //return b; // error
        return undefined;
    }

    console.log("f(true)=" + f(true));
    console.log("f(false)=" + f(false));
}

function test2_7() {
    function foo() {
        return a;
    }

    // 변수가 선언되기 전에 블럭 스코프 변수를 캡쳐할 수 없음 (에러)
    //foo();
    //let a = 10;

    // 변수 선언 후에는 가능함
    let a = 10;
    foo();
}

function test2_8() {
    function f(x: number) {
        // var로 변수를 선언하면 얼마든지 재선언할 수 있음
        var x: number;
        var x: number; // 재선언

        if (true) {
            var x: number; // 섀도잉
        }
    }

    function g() {
        let x = 10;
        //let x = 20; // let으로는 재선언할 수 없음 (에러)
        //var x = 30; // let으로 한번 선언되면 var로도 재선언할 수 없음 (에러)
    }

    function h(x: number) {
        //let x = 10; // let으로는 파라미터를 재선언할 수 없음 (에러)
    }

    function i(condition: boolean, x: number) {
        if (condition) {
            let x = 100; // 여기의 let 선언은 블럭 스코프이기 때문에 파라미터와 충돌하지 않음
            return x;
        }

        return x;
    }

    console.log("i(true, 7)=" + i(true, 7));
    console.log("i(false, 8)=" + i(false, 8));
}

function test2_9() {
    function sumMatrix(matrix: number[][]) {
        var sum = 0;

        for (var i = 0; i < matrix.length; i++) {
            var currentRow = matrix[i];
            for (let i = 0; i < currentRow.length; i++) { // i가 재선언되었지만 let으로 재선언되었기에 정상동작함
                // i overwrite another variable i with same name
                sum += currentRow[i];
            }
        }

        return sum;
    }

    var matrix: number[][] = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];
    console.log("sumMatrix(matrix)=" + sumMatrix(matrix));
}

function test2_10() {
    function theCityThatAlwaysSleeps() {
        let getCity;

        if (true) {
            let city = "Seattle"; // 변수가 환경에 캡쳐되므로 블럭 스코프 밖에서도 이 값을 취할 수 있음
            getCity = function () {
                return city;
            }
        }

        return getCity();
    }

    console.log("theCityThatSleeps()=" + theCityThatAlwaysSleeps());
}

function test2_11() {
    // const 선언
    const numLivesForCat = 9;
    const kitty = {
        name: "Aurora",
        numLives: numLivesForCat,
    }
    //kitty = { name: "Danielle", numLives: numLivesForCat }; // 에러

    kitty.name = "Rory";
    kitty.numLives = 7;
    console.log(kitty);
}

function test2_12() {
    // 튜플 분해
    let input = [1, 2];
    let [first, second] = input;
    console.log("input=" + input);
    console.log("first=" + first + ", second=" + second);

    first = input[0];
    second = input[1];
    console.log("first=" + first + ", second=" + second);

    [first, second] = [second, first];
    console.log("first=" + first + ", second=" + second);

    function f([first, second]: [number, number]) {
        console.log("first=" + first);
        console.log("second=" + second);
    }

    f([3, 4]);

    function g() {
        let [first, ...rest] = [1, 2, 3, 4];
        console.log("first=" + first);
        console.log(rest);
    }

    g();

    function h() {
        let tuple: [number, string, boolean] = [7, "hello", true];
        let [a, b, c] = tuple;
        console.log("tuple=" + tuple);
        console.log("a=" + a + " b=" + b + " c=" + c);
        //let [d, e, f, g] = tuple; // 오류
        let [r, ...st] = tuple;
        console.log("r=" + r + " st=" + st);
        let [u, v, w, ...x] = tuple;
        console.log("u=" + u + " v=" + v + " w=" + w + " x=" + x);
        let [m] = tuple;
        console.log("m=" + m);
        let [, n] = tuple;
        console.log("n=" + n);
    }

    h();

    function i() {
        // 객체 분해
        let o = {
            a: "foo",
            b: 12,
            c: "bar",
        };
        let {a, b} = o;
        console.log("a=" + a + " b=" + b);
    }

    i();

    function j() {
        let o = {
            a: "foo",
            b: 12,
            c: "bar",
        };
        let {a, ...rest} = o;
        console.log("a=" + a + " rest=" + rest);
        let total = rest.b + rest.c.length;
        console.log("total=" + total);

        let {a: newName1, b: newName2} = o;
        console.log("newName1=" + newName1 + " newName2=" + newName2);
        let newName3 = o.a;
        let newName4 = o.b;
        console.log("newName3=" + newName3 + " newName4=" + newName4);
    }

    j();
}

function test2_13() {
    // optional 처리 
    function keepWholeObject(wholeObject: { a: string, b?: number }) {
        let {a, b = 1001} = wholeObject; // b에 default value 지정
        console.log("a=" + a + " b=" + b);
    }

    keepWholeObject({a: "hello"});
}

function test2_14() {
    // function declaration
    type C = { a: String, b?: number }

    function f({a, b}: C): void {

    }

    let c: C = {a: "hello", b: 3}
    f(c);

    // 함수 파라미터는 default value를 지정하는 게 바람직함
    function g({a = "", b = 0} = {}): void {

    }

    g();

    function h({a, b = 0} = {a: ""}): void {

    }

    h();
}

function test2_15() {
    // spread
    let first = [1, 2];
    let second = [3, 4];
    let bothPlus = [0, ...first, ...second, 5]; // spread (shallow copy)
    console.log("bothPlus=" + bothPlus);

    let defaults = {food: "spicy", price: "$$", ambiance: "noisy"};
    let search = { ...defaults, food: "rich"};
    console.log("search=");
    console.log(search);

    class C {
        p = 12;
        m() {

        }
    }
    let c = new C();
    let clone = { ...c };
    clone.p;
    //clone.m(); // error
}

console.log("\n------ test2_1() ------");
test2_1();
console.log("\n------ test2_2() ------");
test2_2();
console.log("\n------ test2_3() ------");
test2_3();
console.log("\n------ test2_4() ------");
test2_4();
console.log("\n------ test2_6() ------");
test2_6();
console.log("\n------ test2_7() ------");
test2_7();
console.log("\n------ test2_8() ------");
test2_8();
console.log("\n------ test2_9() ------");
test2_9();
console.log("\n------ test2_10() ------");
test2_10();
console.log("\n------ test2_11() ------");
test2_11();
console.log("\n------ test2_12() ------");
test2_12();
console.log("\n------ test2_13() ------");
test2_13();
console.log("\n------ test2_14() ------");
test2_14();
console.log("\n------ test2_15() ------");
test2_15();
console.log("\n------ test2_5() ------");
test2_5();
