class Disposable {
    isDisposed: boolean;
    dispose() {
        this.isDisposed = true;
    }
}

class Activatable {
    isActive: boolean;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

class SmartObject {
    constructor() {
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }
    interact() {
        this.activate();
    }
}

interface SmartObject extends Disposable, Activatable {}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);
setTimeout(() => smartObj.dispose(), 2000);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtors => {
        Object.getOwnPropertyNames(baseCtors.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtors.prototype, name));
        });
    });
}