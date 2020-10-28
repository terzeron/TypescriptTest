namespace Animals {
    export class Zebra {
    }
}

namespace Animals {
    export interface Legged {
        numberOfLegs: number;
    };

    export class Dog {
    }
}

namespace Animal {
    let haveMuscles = true;

    export function animalsHaveMuscles() {
        return haveMuscles;
    }
}

namespace Animal {
    export function doAnimalHaveMuscles() {
        //return haveMuscles; // 병합되기 전까지는 멤버 변수가 보이지 않으므로 에러
    }
}

class Album {
    label: Album.AlbumLabel;
}

namespace Album {
    export class AlbumLabel {}
}

function buildLabel(name: string): string {
    return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
    export let suffix = "";
    export let prefix = "Hello, ";
}

enum Color {
    red = 1,
    green = 2,
    blue = 4
}

namespace Color {
    export function mixColor(colorName: string) {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        } else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        }
        else if (colorName == "magenta") {
            return Color.red + Color.blue;
        }
        else if (colorName == "cyan") {
            return Color.green + Color.blue;
        }
    }

}