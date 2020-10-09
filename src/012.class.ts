function test12_1() {
    class Greeter {
        greeting: string;

        constructor(message: string) {
            this.greeting = message;
        }

        greet() {
            return "Hello, " + this.greeting;
        }
    }

    let greeter = new Greeter("world");
    console.log(greeter.greet());
}

function test12_2() {
    class Animal {
        move(distanceInMeters: number = 0) {
            console.log(`Animal moved ${distanceInMeters}m.`);
        }
    }

    class Dog extends Animal {
        bark() {
            console.log("Woof!, Woof!");
        }
    }

    const dog = new Dog();
    dog.bark();
    dog.move(10);
    dog.bark();
}

function test12_3() {
    class Animal {
        name: string;

        constructor(theName: string) {
            this.name = theName;
        }

        move(distanceInMeters: number = 0) {
            console.log(`${this.name} moved ${distanceInMeters}m.`);
        }
    }

    class Snake extends Animal {
        constructor(name: string) {
            super(name);
        }

        move(distanceInMeters = 5) {
            console.log("Slithering...");
            super.move(distanceInMeters);
        }
    }

    class Horse extends Animal {
        constructor(name: string) {
            super(name);
        }

        move(distanceInMeters = 45) {
            console.log("Galloping...");
            super.move(distanceInMeters);
        }
    }

    let sam = new Snake("Sammy the Python");
    let tom: Animal = new Horse("Tommy the Palomino");
    sam.move();
    tom.move();
}

function test12_4() {
    // 비공개(private) 멤버
    class Animal {
        #name: string;

        constructor(theName: string) {
            this.#name = theName;
        }

        getName(): string {
            return this.#name;
        }
    }

    //new Animal("cat").#name; // error
    console.log(new Animal("dog").getName());

    class Human {
        private name: string;

        constructor(theName: string) {
            this.name = theName;
        }

        getName(): string {
            return this.name;
        }
    }

    //new Human("Thomas").name; // error
    console.log(new Human("Mike").getName());
}

function test12_5() {
    class Animal {
        private name: string;

        constructor(theName: string) {
            this.name = theName;
        }
    }

    class Rhino extends Animal {
        constructor() {
            super("Rhino");
        }
    }

    class Employee {
        private name: string;

        constructor(theName: string) {
            this.name = theName;
        }
    }

    let animal = new Animal("Goat");
    let rhino = new Rhino();
    let employee = new Employee("Bob");

    animal = rhino;
    //animal = employee; // 오류: 'Animal'과 'Employee'은 호환될 수 없음.
}

function test12_6() {
    class Person {
        protected name: string;

        protected constructor(name: string) {
            this.name = name;
        }
    }

    class Employee extends Person {
        private department: string;

        constructor(name: string, department: string) {
            super(name);
            this.department = department;
        }

        public getElevatorPitch() {
            return `Hello, my name is ${this.name} and I work in ${this.department}.`;
        }
    }

    let howard = new Employee("Howard", "Sales");
    //let john = new Person("John"); // error
    console.log(howard.getElevatorPitch());
    //console.log(howard.name); // error
}

function test12_7() {
    class Octopus {
        readonly numberOfLegs: number = 8;

        constructor(readonly name: string) {
        }
    }

    let dad = new Octopus("Man with the 8 strong legs");
    //dad.name = "Smith"; // error
    console.log(dad.name);
}

function test12_8() {
    const fullNameMaxLength = 10;

    class Employee {
        private _fullName: string;
        get fullName(): string {
            return this._fullName;
        }

        set fullName(newName: string) {
            if (newName && newName.length > fullNameMaxLength) {
                throw new Error("fullName has a max length of " + fullNameMaxLength);
            }
            this._fullName = newName;
        }
    }

    let employee = new Employee();
    employee.fullName = "Bob Smith";
    if (employee.fullName) {
        console.log(employee.fullName);
    }
    try {
        employee.fullName = "Bob Smith Mike Johns Hopkins";
    } catch (e) {
        console.log(e);
    }
}

function test12_9() {
    class Grid {
        static origin = {x: 0, y: 0};

        calculateDistanceFromOrigin(point: { x: number; y: number; }) {
            let xDist = (point.x - Grid.origin.x);
            let yDist = (point.y - Grid.origin.y);
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        }

        constructor(public scale: number) {
        }
    }

    let grid1 = new Grid(1.0);
    let grid2 = new Grid(5.0);
    console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
    console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
}

function test12_10() {
    abstract class Animal {
        abstract makeSound(): void;

        move(): void {
            console.log("roaming the earth...");
        }
    }

    class Dog extends Animal {
        makeSound(): void {
            console.log("bow wow!");
        }

        move(): void {
            console.log("jumping...");
        }
    }

    let dog = new Dog();
    dog.makeSound();
    dog.move();
}

function test12_11() {
    abstract class Department {
        constructor(public name: string) {
        }
        printName(): void {
            console.log("Department name: " + this.name);
        }
        abstract printMeeting(): void; // 반드시 파생된 클래스에서 구현되어야 합니다.
    }

    class AccountingDepartment extends Department {
        constructor() {
            super("Accounting and Auditing"); // 파생된 클래스의 생성자는 반드시 super()를 호출해야 합니다.
        }
        printMeeting(): void {
            console.log("The Accounting Department meets each Monday at 10am.");
        }
        generateReports(): void {
            console.log("Generating accounting reports...");
        }
    }

    let department: Department; // 추상 타입의 레퍼런스를 생성합니다
    //department = new Department(); // 오류: 추상 클래스는 인스턴스화 할 수 없습니다
    department = new AccountingDepartment(); // 추상이 아닌 하위 클래스를 생성하고 할당합니다
    department.printName();
    department.printMeeting();
    //department.generateReports(); // 오류: 선언된 추상 타입에 메서드가 존재하지 않습니다
}

function test12_12() {
    class Greeter {
        static standardGreeting = "Hello, there";
        greeting: string;
        greet() {
            if (this.greeting) {
                return "Hello, " + this.greeting;
            }
            else {
                return Greeter.standardGreeting;
            }
        }
    }

    let greeter1: Greeter;
    greeter1 = new Greeter();
    console.log(greeter1.greet()); // "Hello, there"

    let greeterMaker: typeof Greeter = Greeter;
    greeterMaker.standardGreeting = "Hey there!";

    let greeter2: Greeter = new greeterMaker();
    console.log(greeter2.greet()); // "Hey there!"
}

function test12_13() {
    class Point {
        x: number;
        y: number;
    }

    interface Point3d extends Point {
        z: number;
    }

    // 암시적인 생성자
    let point3d: Point3d = {x: 1, y: 2, z: 3};
}

console.log("------ test12_1() ------");
test12_1();
console.log("------ test12_2() ------");
test12_2();
console.log("------ test12_3() ------");
test12_3();
console.log("------ test12_4() ------");
test12_4();
console.log("------ test12_5() ------");
test12_5();
console.log("------ test12_6() ------");
test12_6();
console.log("------ test12_7() ------");
test12_7();
console.log("------ test12_8() ------");
test12_8();
console.log("------ test12_9() ------");
test12_9();
console.log("------ test12_10() ------");
test12_10();
console.log("------ test12_11() ------");
test12_11();
console.log("------ test12_12() ------");
test12_12();
console.log("------ test12_13() ------");
test12_13();
