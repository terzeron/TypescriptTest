function test14_1() {
    function identity1(arg: number): number {
        return arg;
    }

    function identity2(arg: any): any {
        // 타입정보를 유실함
        return arg;
    }

    function identity3<T>(arg: T): T {
        // 타입정보가 보존됨
        return arg;
    }

    let output = identity3<string>("myString");
    console.log(output);
}

function test14_2() {
    function loggingIdentity1<T>(arg: T): T {
        //console.log(arg.length);
        return arg;
    }

    // 권장하는 방식
    function loggingIdentity2<T>(arg: T[]): T[] {
        console.log(arg.length);
        return arg;
    }

    // 대안
    function loggingIdentity3<T>(arg: Array<T>): Array<T> {
        console.log(arg.length);
        return arg;
    }

    loggingIdentity2([1, 2, 3]);
    loggingIdentity2<string>(["a", "b", "c"]);
}

function test14_3() {
    function identity<T>(arg: T): T {
        return arg;
    }

    // <T>(arg: T) => T 가 함수의 타입
    // 실제 함수 구현은 identity
    let myIdentity: <U>(arg: U) => U = identity;
    console.log(myIdentity(111));
    console.log(myIdentity("music"));
    console.log(myIdentity<string>("hello"));
    //console.log(myIdentity<string>(111));

    // 함수의 타입을 지정하는 또 다른 방법 { }
    let myIdentity2: { <T>(arg: T): T } = identity;

    // 함수의 타입을 지정하는 또 다른 방법 interface
    interface GenericIdentityFn1 {
        <T>(arg: T): T;
    }

    let myIdentity3: GenericIdentityFn1 = identity;

    // <T>가 선언된 위치가 달라졌음에 유의할 것
    interface GenericIdentityFn2<T> {
        (arg: T): T;
    }

    let myIdentity4: GenericIdentityFn2<number> = identity;
}

function test14_4() {
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function (x, y) {
        return x + y;
    };
    console.log(myGenericNumber.zeroValue);
    console.log(myGenericNumber.add(3, 4));

    let stringNumeric = new GenericNumber<string>();
    stringNumeric.zeroValue = "";
    stringNumeric.add = function (x, y) {
        return x + y;
    };
    console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
    console.log(stringNumeric.add("hello", "world"));
}

function test14_5() {
    function loggingIdentity1<T>(arg: T): T {
        //console.log(arg.length); // error
        return arg;
    }

    interface Lengthwise {
        length: number;
    }

    function loggingIdentity2<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);
        return arg;
    }

    console.log(loggingIdentity2({length: 10, value: 3}));
}

function test14_6() {
    function getProperty<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
    }

    let x = {a: 1, b: 2, c: 3, d: 4};
    console.log(getProperty(x, "a"));
    console.log(getProperty(x, "d"));
    //console.log(getProperty(x, "m")); // error
}

function test14_7() {
    class Human {
        name: string;
    }

    // 팩토리
    // 생성자 함수로 클래스 타입을 참조해야 함
    function create<T>(c: { new(): T; }): T {
        return new c();
    }

    let human = create(Human);
    human.name = "Mike";
    console.log(human.name);

    class BeeKeeper {
        hasMask: boolean;
    }

    class ZooKeeper {
        nametag: string;
    }

    class Animal {
        numLegs: number
    }

    class Bee extends Animal {
        keeper: BeeKeeper;
    }

    class Lion extends Animal {
        keeper: ZooKeeper;
    }

    function createInstance<A extends Animal>(c: new() => A): A {
        return new c();
    }

    let lion: Lion = createInstance(Lion);
    lion.numLegs = 4;
    lion.keeper = {nametag: "John"};
    console.log(lion);

    let bee = createInstance(Bee);
    bee.numLegs = 6;
    bee.keeper = { hasMask: true };
    console.log(bee);
}

console.log("------ test14_1() ------");
test14_1();
console.log("------ test14_2() ------");
test14_2();
console.log("------ test14_3() ------");
test14_3();
console.log("------ test14_4() ------");
test14_4();
console.log("------ test14_5() ------");
test14_5();
console.log("------ test14_6() ------");
test14_6();
console.log("------ test14_7() ------");
test14_7();