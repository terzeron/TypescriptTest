interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
    switch (s.kind) {
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.height * s.width;
        case "circle":
            return Math.PI * s.radius ** 2;
    }
}

let s1: Square = {kind: "square", size: 3};
console.log("area of square:" + area(s1));
let s2: Rectangle = {kind: "rectangle", width: 4, height: 5};
console.log("area of rectangle:" + area(s2));
let s3: Circle = {kind: "circle", radius: 6};
console.log("area of circle:" + area(s3));

interface Triangle {
    kind: "triangle";
    width: number;
    height: number;
}

type Shape2 = Square | Rectangle | Circle | Triangle;

function assertNever(x: Shape2): never {
    throw new Error("unexpected object: " + x);
}

function area2(s: Shape2) {
    switch (s.kind) {
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.height * s.width;
        case "circle":
            return Math.PI * s.radius ** 2;
        default:
            return assertNever(s);
    }
}

let s4: Triangle = {kind: "triangle", width: 4, height: 5};
console.log("area of triangle:" + area2(s4));
