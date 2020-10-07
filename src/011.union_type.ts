function test11_1() {
    function padLeft(value: string, padding: string | number): string {
        if (typeof padding === "number") {
            return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === "string") {
            return padding + value;
        }
        throw new Error(`Expected string or number, got '${padding}'.`);
    }

    console.log(padLeft("Hello world", 4));
    console.log(padLeft("Hello world", "####"))
    //padLeft("Hello world", true); // error
}

function test11_2() {

    interface Bird {
        fly(): void;

        layEggs(): void;
    }

    class Swallow implements Bird {
        fly = function () {
            console.log("A swallow flies!");
        }
        layEggs = function () {
            console.log("A swallow lays an egg!");
        }
    }

    interface Fish {
        swim(): void;

        layEggs(): void;
    }

    class Tuna implements Fish {
        swim = function () {
            console.log("A tuna swims!");
        }
        layEggs = function () {
            console.log("A tuna lays an egg!");
        }
    }

    function getSmallPet(): Fish | Bird {
        return new Tuna();
    }

    let pet = getSmallPet();
    pet.layEggs();
    //pet.swim() // error
    (pet as Fish).swim();
}

function test11_3() {
    type NetworkLoadingState = {
        state: "loading";
    };
    type NetworkFailedState = {
        state: "failed";
        code: number;
    };
    type NetworkSuccessState = {
        state: "success",
        response: {
            title: string,
            duration: number,
            summary: string,
        };
    };
    type NetworkState = | NetworkLoadingState | NetworkFailedState | NetworkSuccessState;

    function networkStatus(state: NetworkState): string {
        //state.code; // error
        switch (state.state) {
            case "loading":
                return "Downloading...";
            case "failed":
                return `Error ${state.code} downloading`;
            case "success":
                return `Downloaded ${state.response.title} - ${state.response.summary}`;
        }
    }

    let state: NetworkSuccessState = {
        state: "success",
        response: {title: "excel file", duration: 10, summary: "The excel file is 4MB."}
    };
    console.log(networkStatus(state));
}

function test11_4() {
    interface ErrorHandling {
        success: boolean;
        error?: { message: string };
    }

    interface ArtworksData {
        artworks: { title: string }[];
    }

    interface ArtistsData {
        artists: { name: string }[];
    }

    type ArtworksResponse = ArtworksData & ErrorHandling;
    type ArtistsResponse = ArtistsData & ErrorHandling;

    const handleArtistsResponse = (response: ArtistsResponse) => {
        if (response.error) {
            console.error(response.error.message);
            return;
        }

        console.log(response.artists);
    };
    let response: ArtistsResponse = {
        artists: [{name: "John Dyke"}],
        success: true
    };
    handleArtistsResponse(response);

    response = {
        artists: [{name: "Mozart"}],
        success: false,
        error: {message: "music sheets are burned!"}
    }
    handleArtistsResponse(response);
}

// 믹스인 테스트
function test11_5() {
    class Person {
        constructor(public name: string) {
        }

        say = function (message: string) {
            console.log(message);
        }
    }

    interface Loggable {
        log(name: string): void;
    }

    class ConsoleLogger implements Loggable {
        log(name: string) {
            console.log(`Hello, I'm ${name}.`);
        }
    }

    function extend<First extends {}, Second extends {}>(
        first: First,
        second: Second
    ): First & Second {
        const result: Partial<First & Second> = {};
        const op1 = Object.getOwnPropertyNames(first);
        for (var i = 0; i < op1.length; i++) {
            (<any>result)[op1[i]] = (<any>first)[op1[i]];
        }
        
        const op2 = Object.getOwnPropertyNames(second);
        for (var i = 0; i < op2.length; i++) {
            (<any>result)[op2[i]] = (<any>second)[op2[i]];
        }
        return result as First & Second;
    }

    const jim = extend(new Person("Jim"), ConsoleLogger.prototype);
    jim.log(jim.name);
}

console.log("------ test11_1() ------");
test11_1();
console.log("------ test11_2() ------");
test11_2();
console.log("------ test11_3() ------");
test11_3();
console.log("------ test11_5() ------");
test11_5();
console.log("------ test11_4() ------");
test11_4();
