interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
}

let box: Box = {height: 5, width: 6, scale: 10};
console.log(box);


class Animal {
}

class Sheep {
}

class Dog {
}

class Cat {
}

interface Cloner {
    clone(animal: Animal): Animal;
}

interface Cloner {
    clone(animal: Sheep): Sheep;
}

interface Cloner {
    clone(animal: Dog): Dog;

    clone(animal: Cat): Cat;
}

interface Document {
    createElement(tagName: any): Element;
}

interface Document {
    createElement(tagName: "div"): HTMLDivElement;

    createElement(tagName: "span"): HTMLSpanElement;
}

interface Document {
    createElement(tagName: string): HTMLElement;

    createElement(tagName: "canvas"): HTMLCanvasElement;
}


