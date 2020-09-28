function test10_1() {
    // 상수
    const helloworld = "Hello world";
    // 변수
    let hiworld = "Hi world";
}

function test10_2() {
    // 문자열 형태의 리터럴 타입
    type Easing = "ease-in" | "ease-out" | "ease-in-out";

    class UIElement {
        animate(dx: number, dy: number, easing: Easing) {
            if (easing == "ease-in") {
                console.log("ease-in");
            } else if (easing == "ease-out") {
                console.log("ease-out")
            } else if (easing == "ease-in-out") {
                console.log("ease-in-out");
            } else {
                console.log("others");
            }
        }
    }

    let button = new UIElement();
    button.animate(0, 0, "ease-in");
    // 컴파일 에러
    //button.animate(1, 2, "uneasy");
}

function test10_3() {
    // 숫자 형태의 리터럴 타입
    function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
        return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
    }

    const result = rollDice();
    console.log("result=" + result);
}

function test10_4() {
    function setupMap(config: MapConfig): void {
        console.log(config.lng + " " + config.lat + " " + config.tileSize);
    }

    interface MapConfig {
        lng: number;
        lat: number;
        tileSize: 8 | 16 | 32;
    }

    setupMap({lng: -73.935242, lat: 40.73061, tileSize: 16});
}


console.log("------ test10_1() ------");
test10_1();
console.log("------ test10_2() ------");
test10_2();
console.log("------ test10_3() ------");
test10_3();
console.log("------ test10_4() ------");
test10_4();
