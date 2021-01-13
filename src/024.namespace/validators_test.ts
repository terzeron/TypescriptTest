/// <reference path="validation.ts" />
/// <reference path="letters_only_validator.ts" />
/// <reference path="zip_code_validator.ts" />

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["Letters only"] = new Validation.LettersOnlyValidator();
validators["ZIP code"] = new Validation.ZipCodeValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}