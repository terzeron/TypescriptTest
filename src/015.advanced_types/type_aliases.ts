type Name = string; // Name이라는 타입은 string과 동일함
type NameResolver = () => string; // NameResolver라는 타입은 string을 반환하는 함수 타입임
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n;
    } else {
        return n();
    }
}

// 올바른 예제인지 확인하지 못했음
let str: Name = "hello world";
console.log(getName(str));
let func: NameResolver = () => "hello java";
console.log(getName(func));

// Container는 value라는 멤버를 가지는 객체
// Container<string>은 string 타입의 value 멤버를 가지는 객체
type Container<T> = { value: T };

// Tree<T>는 T 타입의 value 멤버와 left와 right라는 서브트리를 멤버로 가지는 객체
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}

// LinkedList<T>는 T 타입과 next 멤버를 가지는 객체를 합쳐둔 타입
type LinkedList<T> = T & { next: LinkedList<T> };
interface Person {
    name: string;
}

var people: LinkedList<Person>;
//var s = people.name;
//var s = people.next.name;
//var s = people.next.next.name;
//var s = people.next.next.next.name;

//type Yikes = Array<Yikes>; // error

type Alias = { num: number }

interface Interface {
    num: number;
}

declare function aliased(arg: Alias): Alias;

declare function interfaced(arg: Interface): Interface;



