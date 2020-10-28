type Easing = "ease-in" | "ease-out" | "ease-in-out"

class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            console.log("animate() ease-in")
        } else if (easing === "ease-out") {
            console.log("animate() ease-out")
        } else if (easing === "ease-in-out") {
            console.log("animate() ease-in-out")
        } else {
            console.error("animate() unknown easing type")
        }
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");

//button.animate(0, 0, "uneasy"); // error

function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
function createElement(tagName: string): Element {
    return new Element();
}

function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
    return 3;
}

function foo(x: number) {
    if (x !== 1 /* || x !== 2 */ /* error */) {

    }
}



