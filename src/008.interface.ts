function test8_1() {
    function printLabel(labeledObj: { label: string }) {
        console.log(labeledObj.label);
    }

    let myObj = {size: 10, label: "Size 10 Object"};
    printLabel(myObj);
}

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

function test8_2() {
    let mySquare = createSquare({color: "black"});
    console.log("mySquare=", mySquare);
    let mySquare2 = createSquare({color: "black", width: 5});
    console.log("mySquare2=", mySquare2);
}

function test8_3() {
    // property는 readonly, 변수는 const
    interface Point {
        readonly x: number;
        readonly y: number;
    }

    let p1: Point = {x: 10, y: 20};
    //p1.x = 5; // readonly


    let a: number[] = [1, 2, 3, 4, 5];
    let ro: ReadonlyArray<number> = a;
    console.log("a=", a);
    console.log("ro=", ro);

    a[3] = 100;
    console.log("a=", a);
    //ro[0] = 12; // readonly
    a.push(200);
    console.log("a=", a);
    //ro.push(5); // readonly

    //a = ro; // readonly

    a.length = 10;
    console.log("a=", a);
    //ro.length = 100; // readonly
}

function test8_4() {
    //let mySquare = createSquare({width: 100, opacity: 0.5}); // error
    let mySquare = createSquare({width: 100, opacity: 0.5} as SquareConfig);
    console.log("mySquare=", mySquare);

    interface SquareConfigGenerous {
        color?: string;
        width?: number;

        [propName: string]: any;
    }
}

function test8_5() {
    // 함수에 대한 인터페이스
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }

    let mySearch: SearchFunc;
    mySearch = function (source: string, sub: string): boolean {
        let result = source.search(sub);
        return (result > -1);
    }
    console.log(mySearch("helloworld", "ow"));
}

function test8_6() {
    // 인덱서블 타입
    interface StringArray {
        [index: number]: string;
    }

    let myArray: StringArray;
    myArray = ["Bob", "Fred"];
    let myStr: string = myArray[0];
    console.log("myArray=", myArray);

    console.log("myStr=", myStr);
}

function test8_7() {
    class Animal {
        name: string;
    }

    class Dog extends Animal {
        breed: string;
    }

    let animal: Animal = {name: "Cat"};
    console.log("animal=", animal);
    let dog: Dog = {name: "Dog", breed: "Maltese"};
    console.log("dog=", dog);

    interface NumberOrStringDictionary {
        [index: string]: number | string;

        length: number;
        name: string;
    }

    let myArr: NumberOrStringDictionary = {name: "foo", age: 3, length: 4};
    console.log("myArr=", myArr);
    console.log("myArray=", myArr.name, myArr.age, myArr.length);

    interface ReadonlyStringArray {
        readonly [index: number]: string;
    }

    let myArray: ReadonlyStringArray = ["Alice", "Bob"];
    //myArray[2] = "Mallory"; // readonly
    console.log(myArray);
}

function test8_8() {
    interface ClockInterface {
        currentTime: Date;
    }

    // 구현
    class Clock implements ClockInterface {
        currentTime: Date = new Date();

        setTime(d: Date) {
            this.currentTime = d;
        }

        constructor(h: number, m: number) {
        }
    }

    let clock = new Clock(12, 39);
    console.log("clock=", clock);
    clock.setTime(new Date("2020-01-01T12:23:34+09:00"));
    console.log("clock=", clock);
}

function test8_9() {
    interface ClockConstructor {
        new(hour: number, minute: number): ClockInterface;
    }

    interface ClockInterface {
        tick(): void;
    }

    function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
        return new ctor(hour, minute);
    }

    class DigitalClock implements ClockInterface {
        currentTime: Date;

        constructor(h: number, m: number) {
            this.currentTime = new Date();
            this.currentTime.setHours(h);
            this.currentTime.setMinutes(m);
        }

        tick() {
            console.log("beep beep",);
        }
    }

    class AnalogClock implements ClockInterface {
        currentTime: Date;

        constructor(h: number, m: number) {
            this.currentTime = new Date();
            this.currentTime.setHours(h);
            this.currentTime.setMinutes(m);
        }

        tick() {
            console.log("tick tock");
        }
    }

    let digital = createClock(DigitalClock, 12, 17)
    ;
    console.log("digital=", digital);
    digital.tick();
    let analog = createClock(AnalogClock, 7, 32)
    ;
    console.log("analog=", analog);
    analog.tick();
}

function test8_10() {
    interface Shape {
        color: string;
    }

    // 인터페이스를 인터페이스로 확장하기
    interface Square extends Shape {
        sideLength: number;
    }

    let square = {} as Square;
    square.color = "blue";
    square.sideLength = 10;
    console.log("square=", square);

    interface PenStroke {
        penWidth: number;
    }

    interface SquarePen extends Shape, PenStroke {
        sideLength: number;
    }

    let squarePen = {} as SquarePen;
    squarePen.color = "blue";
    squarePen.sideLength = 10;
    squarePen.penWidth = 5.0;
    console.log("squarePen=", squarePen);
}

function test8_11() {
    interface Counter {
        (start: number): string;

        start: number;
        interval: number;

        reset(): void;

        get(): void;
    }

    function getCounter(): Counter {
        let counter = (function (start: number) {
            this.start = start;
        }) as Counter;
        counter.interval = 123;
        counter.reset = function () {
        };
        return counter;
    }

    // 이렇게 생성된 객체는 함수와 객체 역할을 모두 수행함
    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;
}

function test8_12() {
    class Control {
        private state: any;
    }

    interface SelectableControl extends Control {
        // private state 멤버변수를 상속받음
        select(): void;
    }

    class Button extends Control implements SelectableControl {
        select() {
        }
    }

    let button = new Button();
    console.log(button);

    class TextBox extends Control {
        select() {
        }
    }

    let textbox = new TextBox();
    console.log(textbox);

    //class Image implements SelectableControl { // because Image is not a child of Control
    class Image extends Control implements SelectableControl {
        private state1: any;

        select() {
        }
    }

    let image = new Image();
    console.log(image);
}


console.log("------ test8_1() ------");
test8_1();
console.log("\n------ test8_2() ------");
test8_2();
console.log("\n------ test8_3() ------");
test8_3();
console.log("\n------ test8_4() ------");
test8_4();
console.log("\n------ test8_5() ------");
test8_5();
console.log("\n------ test8_6() ------");
test8_6();
console.log("\n------ test8_8() ------");
test8_7();
console.log("\n------ test8_8() ------");
test8_8();
console.log("\n------ test8_9() ------");
test8_9();
console.log("\n------ test8_10() ------");
test8_10();
console.log("\n------ test8_11() ------");
test8_11();
console.log("\n------ test8_12() ------");
test8_12();
