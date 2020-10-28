function padLeft(value: string, padding: string | number) {
    // number, string, boolean, symbol
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

console.log(padLeft("Hello world", 4));
console.log(padLeft("Hello world", "-*- "));

interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("-**-");
}

let padder: Padder = getRandomPadder();
if (padder instanceof SpaceRepeatingPadder) {
    console.log("space repeating padder='" + padder.getPaddingString() + "'");
}
if (padder instanceof StringPadder) {
    console.log("string padder='" + padder.getPaddingString() + "'");
}

interface Bird {
    fly(): void;

    layEggs(): void;
}

interface Fish {
    swim(): void;

    layEggs(): void;
}

function getSmallPet(): Fish | Bird {
    let pet = {
        fly: function () {
            console.log("flying...");
        },
        layEggs: function () {
            console.log("laying eggs...");
        }
    }

    return pet as Fish | Bird;
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

let pet = getSmallPet();
pet.layEggs();
//pet.swim(); // error
if ((pet as Fish).swim) {
    (pet as Fish).swim();
} else if ((pet as Bird).fly) {
    (pet as Bird).fly();
}
console.log("is fish? " + isFish(pet));

if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}

function move(pet: Fish | Bird) {
    if ("swim" in pet) {
        return pet.swim();
    }
    return pet.fly();
}

move(pet);

