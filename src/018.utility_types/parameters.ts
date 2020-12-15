declare function f1(arg: { a: number, b:  string}): void
type T0 = Parameters<() => string>; // 함수의 파라미터 => []
type T1 = Parameters<(s: string) => void>; // [string]
type T2 = Parameters<(<T>(arg: T) => T)>;  // [unknown]
type T4 = Parameters<typeof f1>;  // [{ a: number, b: string }]
type T5 = Parameters<any>;  // unknown[]
type T6 = Parameters<never>;  // never
//type T7 = Parameters<string>;  // 오류
//type T8 = Parameters<Function>;  // 오류
