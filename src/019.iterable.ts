function for_of_test() {
    let someArray = [1, "string", false];

    for (let entry of someArray) {
        console.log(entry);
    }
}

function for_in_test1() {
    let list = [4, 5, 6];
    for (let i in list) { // key(index)
        console.log(i + " -> " + list[i]);
    }
    for (let i of list) { // value
        console.log(i);
    }
}

function for_in_test2() {
    let pets = new Set(["Cat", "Dog", "Hamster"]);
    pets["species"] = "mammals";

    for (let pet in pets) {
        console.log(pet);
    }
    for (let pet of pets) {
        console.log(pet);
    }
}

console.log("------ for_of_test() ------");
for_of_test();
console.log("------ for_in_test1() ------");
for_in_test1();
console.log("------ for_in_test2() ------");
for_in_test2();