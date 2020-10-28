/*
function pluck(o, propertyNames) {
    return propertyNames.map(n => o[n]);
}
*/

// T타입의 객체에서 일부 K타입의 prop만 추출해서 반환하는 함수
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
    return propertyNames.map(n => o[n]);
}

interface Car {
    manufacturer: string;
    model: string;
    year: number;
}

let taxi: Car = {
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2014
};

let makeAndModel: string[] = pluck(taxi, ['manufacturer', 'model']);
console.log(makeAndModel);

let modelYear = pluck(taxi, ['model', 'year']);
console.log(modelYear);

let carProps: keyof Car;
//pluck(taxi, ['year', 'unknown']); // error
console.log(carProps);

// prop의 값을 꺼내는 함수
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName];
}

let name1: string = getProperty(taxi, "manufacturer");
console.log(name1);
let year: number = getProperty(taxi, "year");
console.log(year);

//let unknown = getProperty(taxi, "unknown");


interface Dictionary<T> {
    [key: string]: T;
}

let keys: keyof Dictionary<number>;
let value1: Dictionary<number>['foo'];

interface Dictionary2<T> {
    [key: number]: T;
}

let keys2: keyof Dictionary2<number>;
//let value2: Dictionary2<number>['foo']; // error
let value3: Dictionary2<number>[42];
