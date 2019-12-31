export function test2_1() {
    function f() {
        var a = 10;
        return function g() {
            var b = a + 1;
            return b;
        }
    }

    var a = 10;
    var g = f();
    console.log("in test2_1(), g()=" + g());
}

export function test2_2() {
    function f2() {
        var a = 1;
        a = 2;

        var b = g();
        a = 3;

        return b;
        
        function g() {
            return a;
        }
    }
    
    console.log("in test2_2(), f2()=" + f2());
}

export function test2_3() {
    function f(shouldInitialize: boolean) {
        if (shouldInitialize) {
            var x = 10;
        }

        return x;
    }

    console.log("in test2_3(), f(true)=" + f(true));
    console.log("in test2_3(), f(false)=" + f(false));
}

export function test2_4() {
    function sumMatrix(matrix: number[][]) {
        var sum = 0;

        for (var i = 0; i < matrix.length; i++) {
            var currentRow = matrix[i];
            for (var i = 0; i < currentRow.length; i++) {
                // i overwrite another variable i with same name
                sum += currentRow[i];
            }
        }

        return sum;
    }

    var matrix: number[][] = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];
    console.log("in test2_4(), sumMatrix(matrix)=" + sumMatrix(matrix));
}

export function test2_5() {
    for (var i = 0; i < 5; i++) {
        // setTimeout의 callback은 for loop이 끝난 다음에 실행되므로 i는 항상 10
        setTimeout(function() { console.log(i); }, 100 * i);
    }

    for (var i = 0; i < 5; i++) {
        // IIFE: Immediately Invoked Function Expression
        (function(i) {
            setTimeout(function() { console.log(i); }, 100 * i);
        })(i);
    }
}

export function test2_6() {
    function f(input: boolean) {
        let a = 100;

        if (input) {
            let b = a + 1;
            return b;
        }

        //return b; // error
        return undefined;
    }

    console.log("in test2_6(), f(true)=" + f(true));
    console.log("in test2_6(), f(false)=" + f(false));
}


console.log("\n---------------\n");
test2_1();
console.log("\n---------------\n");
test2_2();
console.log("\n---------------\n");
test2_3();
console.log("\n---------------\n");
test2_4();
console.log("\n---------------\n");
test2_5();
console.log("\n---------------\n");
test2_6();
