function decorator_test() {
    function f() {
        console.log("f(): evaluated");
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            console.log("f(): called");
        }
    }

    function g() {
        console.log("g(): evaluated");
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            console.log("g(): called");
        }
    }

    class C {
        @f()
        @g()
        method() {
        }
    }

    console.log("instantiating...");
    let c = new C();
    console.log("before method call");
    c.method();
}

function class_decorator_test1() {
    function sealed(constructor: Function) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    }

    @sealed
    class Greeter {
        greeting: string;

        constructor(message: string) {
            this.greeting = message;
        }

        greet() {
            return "Hello, " + this.greeting;
        }
    }

    let g = new Greeter("Jack");
    console.log(g.greet());
}

function class_decorator_test2() {
    function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            newProperty = "new property";
            hello = "override";
        }
    }

    @classDecorator
    class Greeter {
        property = "property";
        hello: string;

        constructor(m: string) {
            this.hello = m;
        }
    }

    let g = new Greeter("world");
    console.log(g);
}

function method_decorator_test() {
    function enumerable(value: boolean) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            descriptor.enumerable = value;
        }
    }

    class Greeter {
        greeting: string;

        constructor(message: string) {
            this.greeting = message;
        }

        @enumerable(false)
        greet() {
            return "Hello, " + this.greeting;
        }
    }

    let g = new Greeter("Mike");
    console.log(g.greet());
}

function accessor_decorator_test() {
    function configurable(value: boolean) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            descriptor.configurable = value;
        }
    }

    class Point {
        private _x: number;
        private _y: number;

        constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }

        @configurable(false)
        get x() {
            return this._x;
        }

        @configurable(false)
        get y() {
            return this._y;
        }
    }

    let p = new Point(30.5, 17.11);
    console.log(p.x + ", " + p.y);
}

import "reflect-metadata";

const formatMetadataKey = Symbol("format");

function property_decorator_test() {
    class Greeter {
        @format("Hello, %s")
        greeting: string;

        constructor(message: string) {
            this.greeting = message;
        }

        greet() {
            let formatString = getFormat(this, "greeting");
            console.log("greet(): formatString='" + formatString + "'");
            return formatString.replace("%s", this.greeting);
        }
    }

    function format(formatString: string) {
        console.log("format(): formatString=" + formatString);
        console.log("format(): formatMetadataKey=" + formatMetadataKey.toString());
        return Reflect.metadata(formatMetadataKey, formatString);
    }

    function getFormat(target: any, propertyKey: string) {
        console.log("getFormat(): target=" + target + ", propertyKey=" + propertyKey);
        console.log("getFormat(): formatMetadataKey=" + formatMetadataKey.toString());
        return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
    }

    let g = new Greeter("Smith");
    console.log(g.greet());
}

const requiredMetadataKey = Symbol("required");

function parameter_decorator_test() {
    class Greeter {
        greeting: string;

        constructor(message: string) {
            this.greeting = message;
        }

        @validate
        greet(@required name: string) {
            return "Hello " + name + ", " + this.greeting;
        }
    }

    function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
        let method = descriptor.value;
        descriptor.value = function () {
            let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
            if (requiredParameters) {
                for (let parameterIndex of requiredParameters) {
                    if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                        throw new Error("Missing required argument.");
                    }
                }
            }

            return method.apply(this, arguments);
        }
    }

    function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
        let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
        existingRequiredParameters.push(parameterIndex);
        Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
    }

    let g = new Greeter("How are you?");
    console.log(g.greet("Phil"));
}

function metadata_test() {
    class Point {
        x: number;
        y: number;
        toString() { return "(" + this.x + ", " + this.y + ")"; }
    }

    class Line {
        private _p0: Point;
        private _p1: Point;

        @validate
        set p0(value: Point) { this._p0 = value; }
        get p0() { return this._p0; }

        @validate
        set p1(value: Point) { this._p1 = value; }
        get p1() { return this._p1; }
    }

    function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
        let set = descriptor.set;
        descriptor.set = function (value: T) {
            let type = Reflect.getMetadata("design:type", target, propertyKey);
            if (!(value instanceof type)) {
                throw new TypeError("Invalid type.");
            }
            set.call(target, value);
        }
    }

    let line = new Line();
    line.p0 = new Point();
    line.p0.x = 10;
    line.p0.y = 20;
    line.p1 = new Point();
    line.p1.x = 37.13;
    line.p1.y = 60.2;
    console.log(line.p0 + " -> " + line.p1);
}

console.log("------ decorator_test ------");
decorator_test();
console.log("------ class_decorator_test1 ------");
class_decorator_test1();
console.log("------ class_decorator_test2 ------");
class_decorator_test2();
console.log("------ method_decorator_test ------");
method_decorator_test();
console.log("------ accessor_decorator_test ------");
accessor_decorator_test();
console.log("------ property_decorator_test ------");
property_decorator_test();
console.log("------ parameter_decorator_test ------");
parameter_decorator_test();
console.log("------ metadata_test ------");
metadata_test();
