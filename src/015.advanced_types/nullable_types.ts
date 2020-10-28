let s = "foo";
console.log(s);
s = null;
console.log(s);

let sn: string | null = "bar";
console.log(sn);
sn = null;
console.log(sn);
sn = undefined;
console.log(sn);

function f(x: number, y?: number) {
    return x + (y || 0);
}
console.log(f(1, 2));
console.log(f(1));
console.log(f(1, undefined));
//console.log(f(1, null)); // error

class C {
    a: number;
    b?: number;
}
let c = new C();
c.a = 12;
console.log(c);
c.a = undefined;
console.log(c);
c.b = 13;
console.log(c);
c.b = undefined;
console.log(c);
c.b = null; // strict mode에서는 에러 
console.log(c);

function f1(sn: string | null): string {
    if (sn == null) {
        return "default";
    } else {
        return sn;
    }
}

function f2(sn: string | null): string {
    return sn || "default";
}

console.log(f1("hello"));
//console.log(f1(1)); // error
console.log(f1(null));
console.log(f1(undefined));

console.log(f2("hello"));
//console.log(f2(1)); // error
console.log(f2(null));
console.log(f2(undefined));

function broken(name: string | null): string {
    function postfix(epithet: string) {
        return name.charAt(0) + '.  the ' + epithet;
    }
    name = name || "Bob";
    return postfix("great");
}

function fixed(name: string | null): string {
    function postfix(epithet: string) {
        // ! 연산자
        return name!.charAt(0) + '.  the ' + epithet;
    }
    name = name || "Bob";
    return postfix("great");
}

console.log(broken("Mike"));
console.log(broken(null)); // strict mode에서는 에러
console.log(fixed("Mike"));
console.log(fixed(null));

