interface PersonPartial {
    name?: string;
    age?: number;
}

interface PersonReadonly {
    readonly name: string;
    readonly age: number;
}

// Readonly와 Partial은 타입스크립트의 표준 라이브러리에 포함되어 있음
type Readonly1<T> = {
    readonly [P in keyof T]: T[P];
}

// 멤버변수를 일부만 가지는 타입
type Partial1<T> = {
    [P in keyof T]?: T[P];
}

type Person = { name: string; }

type PersonPartial1 = Partial1<Person>;
type ReadonlyPerson1 = Readonly1<Person>;

type PartialWrithNewMember1<T> = {
    [P in keyof T]?: T[P];
} & { newMember: boolean }

// error
/*
type PartialWithNewMember2<T> = {
    [P in keyof T]?: T[P];
    newMember: boolean;
}
*/

type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
// 다음과 동일함
/*
type Flags = {
    option1: boolean;
    option2: boolean;
}
*/

// optional type
type NullablePerson = { [P in keyof Person]: Person[P] | null }
type PartialPerson = { [P in keyof Person]: Person[P] }

// 좀 더 일반적인 버전
type Nullable2<T> = { [P in keyof T]: T[P] | null }
type Partial2<T> = { [P in keyof T]?: T[P] }

type Proxy<T> = {
    get(): T;
    set(value: T): void;
}

type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}
function proxify<T>(o: T): Proxify<T> {
    return;
}
let props = { name: 'foo', age: 30 }
let proxyProps = proxify(props);

// Pick과 Record는 타입스크립트의 표준 라이브러리에 포함되어 있음
type Pick1<T, K extends keyof T> = {
    [P in K]: T[P];
}
type Record1<K extends keyof any, T> = {
    [P in K]: T;
}

type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>;

function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get();
    }
    return result;
}
let originalProps = unproxify(proxyProps);

