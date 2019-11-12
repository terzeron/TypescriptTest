export function test1() {
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
   
}

test1();
