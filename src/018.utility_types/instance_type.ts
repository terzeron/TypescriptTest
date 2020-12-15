class C {
    x = 0;
    y = 0;
}

type T0 = InstanceType<typeof C>; // C
type T1 = InstanceType<any>; // any
type T2 = InstanceType<never>; // any
//type T3 = InstanceType<string>;  // 오류
//type T4 = InstanceType<Function>;  // 오류