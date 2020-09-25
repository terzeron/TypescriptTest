function test9_1() {
    // named function
    function add(x: number, y: number) {
        return x + y;
    }

    console.log(add(3, 5));

    // anonymous function
    let myAdd = function (x: number, y: number) {
        return x + y;
    };

    console.log(myAdd(4, 9));
}

function test9_2() {
    // 함수의 반환 타입은 =>을 써서 명시할 수 있음
    // myAdd1의 타입은 (x: number, y: number) => number임
    //         정의는 = function ...
    let myAdd1: (x: number, y: number) => number = function (x: number, y: number): number {
        return x + y;
    };
    console.log(myAdd1(12, 4));
    // myAdd2의 타입은 (baseValue: number, increment: number) => number임
    //         정의는 = function ...
    let myAdd2: (baseValue: number, increment: number) => number = function (x: number, y: number): number {
        return x + y;
    };
    console.log(myAdd2(12, 4));
}

function test9_3() {
    let myAdd1 = function (x: number, y: number): number {
        return x + y;
    };
    let myAdd2: (baseValue: number, increment: number) => number = function (x, y) {
        return x + y;
    };
}

function test9_4() {
    function buildName(firstName: string, lastName: string) {
        return firstName + " " + lastName;
    }

    //let result1 = buildName("Bob");
    //let result2 = buildName("Bob", "Adams", "Sr.");
    let result3 = buildName("Bob", "Adams");
    console.log(result3);
}

function test9_5() {
    function buildName(firstName: string, lastName?: string) {
        if (lastName)
            return firstName + " " + lastName;
        else
            return firstName;
    }

    let result1 = buildName("Bob");
    //let result2 = buildName("Bob", "Adams", "Sr.");
    let result3 = buildName("Bob", "Adams");
    console.log(result1);
    console.log(result3);
}

function test9_6() {
    function buildName(firstName: string, lastName = "Smith") {
        return firstName + " " + lastName;
    }

    let result1 = buildName("Bob");
    let result3 = buildName("Bob", "Adams");
    console.log(result1);
    console.log(result3);
}

function test9_7() {
    function buildName(firstName = "Will", lastName: string) {
        return firstName + " " + lastName;
    }

    //let result1 = buildName("Bob");
    //let result2 = buildName("Bob", "Adams", "Sr.");
    let result3 = buildName("Bob", "Adams");
    let result4 = buildName(undefined, "Adams");
    console.log(result3);
    console.log(result4);
}

function test9_8() {
    let deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function () {
            // cardPicker()를 비-메소드로 호출할 때 this가 deck을 가리키는 게 아니라 최상위 객체(window or undefined)를 가리킴
            // return function () {
            //     let pickedCard = Math.floor(Math.random() * 52);
            //     let pickedSuit = Math.floor(pickedCard / 13);
            //
            //     return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            // }
            // ES6 arrow는 함수가 호출된 곳이 아니라 생성된 곳에서 바인딩함
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    }

    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();
    console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}

function test9_9() {
    interface Event {
        message: string;
    }

    interface UIElement {
        // onclick 함수를 매개변수로 받아서 등록하는 함수
        addClickEventListener(onclick: (this: void, e: Event) => void): void;
    }

    class ButtonElement implements UIElement {
        addClickEventListener(onclick: (this: void, e: Event) => void) {
            console.log("addClickEventListener(" + onclick + ")");
        }
    }

    class Handler {
        info: string;
        // 마찬가지 이유
        // onClickBad(this: Handler, e: Event) {
        //     this.info = e.message;
        // }
        onClickGood = (e: Event) => {
            this.info = e.message;
        }
    }

    let uiElement = new ButtonElement();
    let h = new Handler();
    // uiElement.addClickEventListener(h.onClickBad);
    uiElement.addClickEventListener(h.onClickGood);
}

function test9_10() {
    let suits = ["hearts", "spades", "clubs", "diamonds"];

    function pickCard(x: any): any {
        // 오버로드 
        if (typeof x == "object") {
            let pickedCard = Math.floor(Math.random() * x.length);
            return pickedCard;
        } else if (typeof x == "number") {
            let pickedSuit = Math.floor(x / 13);
            return {suit: suits[pickedSuit], card: x % 13};
        }
    }

    let myDeck = [{suit: "diamonds", card: 2}, {suit: "spades", card: 10}, {suit: "hearts", card: 4}];
    let pickedCard1 = myDeck[pickCard(myDeck)];
    console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);
    let pickedCard2 = pickCard(15);
    console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);

}

function test9_11() {
    let suits = ["hearts", "spades", "clubs", "diamonds"];

    function pickCard(x: {suit: string, card: number; }[]): number;
    function pickCard(x: number): {suit: string, card: number; };
    function pickCard(x: any): any {
        // 오버로드
        if (typeof x == "object") {
            let pickedCard = Math.floor(Math.random() * x.length);
            return pickedCard;
        } else if (typeof x == "number") {
            let pickedSuit = Math.floor(x / 13);
            return {suit: suits[pickedSuit], card: x % 13};
        }
    }

    let myDeck = [{suit: "diamonds", card: 2}, {suit: "spades", card: 10}, {suit: "hearts", card: 4}];
    let pickedCard1 = myDeck[pickCard(myDeck)];
    console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);
    let pickedCard2 = pickCard(15);
    console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);

}

console.log("------ test9_1() ------");
test9_1();
console.log("------ test9_2() ------");
test9_2();
console.log("------ test9_3() ------");
test9_3();
console.log("------ test9_4() ------");
test9_4();
console.log("------ test9_5() ------");
test9_5();
console.log("------ test9_6() ------");
test9_6();
console.log("------ test9_7() ------");
test9_7();
console.log("------ test9_8() ------");
test9_8();
console.log("------ test9_9() ------");
test9_9();
console.log("------ test9_10() ------");
test9_10();
console.log("------ test9_11() ------");
test9_11();
