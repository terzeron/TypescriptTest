type T0 = Exclude<"a" | "b" | "c", "a">; // except a from a, b, c => only b or c
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // except a, b from a, b, c => only c
type T2 = Exclude<string | number | (() => void), Function>; // string or number

