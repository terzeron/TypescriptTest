function test13_1() {
    enum Direction {
        Up = 1,
        Down,
        Left,
        Right,
    }

    enum Response {
        No = 0,
        Yes = 1,
    }

    console.log(Response.Yes);
}

function test13_2() {
    enum Direction {
        Up = "UP",
        Down = "DOWN",
        Left = "LEFT",
        Right = "RIGHT",
    }

    console.log(Direction.Down);

    enum BooleanLikeHeteogeneousEnum {
        No = 0,
        Yes = "YES",
    }

    console.log(BooleanLikeHeteogeneousEnum.No);
    console.log(BooleanLikeHeteogeneousEnum.Yes);
}

function test13_3() {
    enum E { X }

    enum E1 { X, Y, Z}

    enum E2 { A = 1, B, C}

    enum FileAccess {
        None,
        Read,
        Write,
        ReadWrite = Read | Write,
        G = "123".length
    }

    console.log(FileAccess.None);
    console.log(FileAccess.Read);
    console.log(FileAccess.Write);
    console.log(FileAccess.ReadWrite);
    console.log(FileAccess.G);
}

function test13_4() {
    enum ShapeKind {
        Circle,
        Square,
    }

    interface Circle {
        kind: ShapeKind.Circle;
        radius: number;
    }

    interface Square {
        kind: ShapeKind.Square;
        sideLength: number;
    }

    let c: Circle = {
        //kind: ShapeKind.Square,
        kind: ShapeKind.Circle,
        radius: 100,
    }
    console.log(c.kind);
    console.log(c.radius);
}

function test13_5() {
    enum E {
        Foo,
        Bar
    }

    function f(x: E) {
        if (x !== E.Foo /* || x !== E.Bar */) {
            console.log("not E.foo");
        }
    }

    f(E.Foo);
    f(E.Bar);
}

function test13_6() {
    enum E {
        X, Y, Z,
    }

    function f(obj: { X: number }) {
        return obj.X;
    }

    console.log(f(E));
}

function test13_7() {
    enum LogLevel {
        ERROR, WARN, INFO, DEBUG,
    }

    type LogLevelStrings = keyof typeof LogLevel;

    function printImportant(key: LogLevelStrings, message: string) {
        const num = LogLevel[key];
        if (num <= LogLevel.WARN) {
            console.log('Log level key is: ', key);
            console.log('Log level value is: ', num);
            console.log('Log level message is: ', message);
        }
    }

    printImportant('ERROR', 'This is a message');
}

function test13_8() {
    enum Enum {
        A
    }

    let a = Enum.A;
    let nameOfA = Enum[a];
    console.log("a=" + a);
    console.log("nameOfA=" + nameOfA);
}

function test13_9() {
    const enum Enum {
        A = 1,
        B = A * 2,
    }

    const enum Directions {
        Up,
        Down,
        Left,
        Right,
    }
    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    console.log(directions);
  }

console.log("------ test13_1() ------");
test13_1();
console.log("------ test13_2() ------");
test13_2();
console.log("------ test13_3() ------");
test13_3();
console.log("------ test13_4() ------");
test13_4();
console.log("------ test13_5() ------");
test13_5();
console.log("------ test13_6() ------");
test13_6();
console.log("------ test13_7() ------");
test13_7();
console.log("------ test13_8() ------");
test13_8();
console.log("------ test13_9() ------");
test13_9();
