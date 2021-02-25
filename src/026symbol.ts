function symbol_test1() {
    let sym1 = Symbol();
    let sym2 = Symbol("key");
    let sym3 = Symbol("key");
    console.log(sym1 === sym2);
    console.log(sym2 === sym3);
}

function symbol_test2() {
    const sym = Symbol();
    let obj = {
        // hash map에서 key로 사용
        [sym]: "value"
    }
    console.log(sym);
    console.log(obj);
}

function symbol_test3() {
    const getClassNameSymbol = Symbol()
    class C {
        // 클래스 computed property로 사용
        [getClassNameSymbol]() {
            return "C";
        }
    }
    let c = new C();
    let className = c[getClassNameSymbol]();
    console.log(c);
    console.log(className);
}

console.log("\n------ symbol_test1() ------");
symbol_test1()
console.log("\n------ symbol_test2() ------");
symbol_test2()
console.log("\n------ symbol_test3() ------");
symbol_test3()
