export function test2_1() {
    var a = 10;
    console.log(a);
    var g = f();
    console.log(g());
}

function f() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    }
}

test2_1();
