export function test1_1() {
    let isDone: boolean = false;
    let decimal: number = 6;
    let hex: number = 0xf00d;
    let binary: number = 0b1010;
    let octal: number = 0o744;
    console.log(isDone);
    console.log(decimal);
    console.log(hex);
    console.log(binary);
    console.log(octal);
    
    let color: string = "blue";
    color = "red";
    console.log(color);

    let fullName: string = "Bob Bobbington";
    let age: number = 37;
    let sentence: string = `Hello, my name is ${ fullName }.

    I'll be ${ age + 1 } years old next month.`;
    console.log(sentence);

    let list: number[] = [1, 2, 3];
    //let list: Array<number> = [1, 2, 3];
    console.log(list);

    let x: [string, number];
    x = ["hello", 10];
    console.log(x);
    console.log(x[0].substr(1));
    //console.log(x[1].substr(1));
    //x = [10, "hello"];
    //console.log(x);

    //x[2] = "hello";
    //x[3] = "world";
    //console.log(x[5].toString());
    //x[6] = true;
}

export function test1_2() {
    enum Color { Red, Green, Blue};
    let c: Color = Color.Green;
    console.log(c);
    let colorName: string = Color[Color.Blue];
    console.log(colorName);

    let notSure: any = 4;
    notSure = "문자열";
    console.log(notSure);
    notSure = false;
    console.log(notSure);
    //notSure.ifItExists();
    //notSure.toFixed();

    let prettySure: Object = 4;
    //prettySure.toFixed();

    let list: any[] = [1, true, "free"]
    list[1] = 100;
    console.log(list);

    let unusable: void = undefined;
    let u: undefined = undefined;
    let n: null = null;
}

function warnUser(): void {
    console.log("This is my warning message");
}

function error(message: string): never {
    throw new Error(message);
}

function fail(): never {
    return error("Something failed");
}

function infiniteLoop(): never {
    while (true) {
    }
}

export function test1_3() {
    let someValue: any = "this is a string";
    let strLength: number = (<string>someValue).length;
    console.log(someValue);
    console.log(strLength);
}


test1_1();
test1_2();
test1_3();
