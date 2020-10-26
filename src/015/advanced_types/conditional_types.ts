declare function f<T extends boolean>(x: T): T extends true ? string : number;

//let x = f(Math.random() < 0.5);

type TypeName<T> =
    T extends string ? "string" :
        T extends number ? "number" :
            T extends boolean ? "boolean" :
                T extends undefined ? "undefined" :
                    T extends Function ? "function" :
                        "object";

type T0 = TypeName<string>;
type T1 = TypeName<"a">;
type T2 = TypeName<true>;
type T3 = TypeName<() => void>;
type T4 = TypeName<string[]>;

interface Foo {
    propA: boolean;
    propB: boolean;
}

declare function f<T>(x: T): T extends Foo ? string : number;
function foo<U>(x: U) {
    let a = f(x);
    let b: string | number = a;
}

type T10 = TypeName<string | (() => void)>;  // "string" | "function"
type T12 = TypeName<string | string[] | undefined>;  // "string" | "object" | "undefined"
type T11 = TypeName<string[] | number[]>;  // "object"

type BoxedValue<T> = { value: T };
type BoxedArray<T> = { array: T[] };
type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;

type T20 = Boxed<string>;  // BoxedValue<string>;
type T21 = Boxed<number[]>;  // BoxedArray<number>;
type T22 = Boxed<string | number[]>;  // BoxedValue<string> | BoxedArray<number>;

type Diff<T, U> = T extends U ? never : T;  // U에 할당할 수 있는 타입을 T에서 제거
type Filter<T, U> = T extends U ? T : never;  // U에 할당할 수 없는 타입을 T에서 제거

type T30 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T31 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"
type T32 = Diff<string | number | (() => void), Function>;  // string | number
type T33 = Filter<string | number | (() => void), Function>;  // () => void

type NonNullable<T> = Diff<T, null | undefined>;  // T에서 null과 undefined를 제거

type T34 = NonNullable<string | number | undefined>;  // string | number
type T35 = NonNullable<string | string[] | null | undefined>;  // string | string[]

function f1<T>(x: T, y: NonNullable<T>) {
    x = y;  // 성공
    //y = x;  // 오류
}

function f2<T extends string | undefined>(x: T, y: NonNullable<T>) {
    x = y;  // 성공
    //y = x;  // 오류
    let s1: string = x;  // 오류
    let s2: string = y;  // 성공
}

type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

interface Part {
    id: number;
    name: string;
    subparts: Part[];
    updatePart(newName: string): void;
}

type T40 = FunctionPropertyNames<Part>;  // "updatePart"
type T41 = NonFunctionPropertyNames<Part>;  // "id" | "name" | "subparts"
type T42 = FunctionProperties<Part>;  // { updatePart(newName: string): void }
type T43 = NonFunctionProperties<Part>;  // { id: number, name: string, subparts: Part[] }

//type ElementType<T> = T extends any[] ? ElementType<T[number]> : T;  // 오류

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type Unpacked<T> =
    T extends (infer U)[] ? U :
        T extends (...args: any[]) => infer U ? U :
            T extends Promise<infer U> ? U :
                T;

type T0 = Unpacked<string>;  // string
type T1 = Unpacked<string[]>;  // string
type T2 = Unpacked<() => string>;  // string
type T3 = Unpacked<Promise<string>>;  // string
type T4 = Unpacked<Promise<string>[]>;  // Promise<string>
type T5 = Unpacked<Unpacked<Promise<string>[]>>;  // string

type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;
type T10 = Foo<{ a: string, b: string }>;  // string
type T11 = Foo<{ a: string, b: number }>;  // string | number

type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;
type T20 = Bar<{ a: (x: string) => void, b: (x: string) => void }>;  // string
type T21 = Bar<{ a: (x: string) => void, b: (x: number) => void }>;  // string & number

declare function foo(x: string): number;
declare function foo(x: number): string;
declare function foo(x: string | number): string | number;
type T30 = ReturnType<typeof foo>;  // string | number

type ReturnType<T extends (...args: any[]) => infer R> = R;  // 오류, 지원되지 않습니다.
type AnyFunction = (...args: any[]) => any;
type ReturnType<T extends AnyFunction> = T extends (...args: any[]) => infer R ? R : any;

type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type T02 = Exclude<string | number | (() => void), Function>;  // string | number
type T03 = Extract<string | number | (() => void), Function>;  // () => void

type T04 = NonNullable<string | number | undefined>;  // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

function f1(s: string) {
    return { a: 1, b: s };
}

class C {
    x = 0;
    y = 0;
}

type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // never
type T17 = ReturnType<string>;  // 오류
type T18 = ReturnType<Function>;  // 오류

type T20 = InstanceType<typeof C>;  // C
type T21 = InstanceType<any>;  // any
type T22 = InstanceType<never>;  // never
type T23 = InstanceType<string>;  // 오류
type T24 = InstanceType<Function>;  // 오류

