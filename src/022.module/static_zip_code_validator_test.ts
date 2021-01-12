import validate from './static_zip_code_validator';

let strings = ["Hello", "98052", "101"];

strings.forEach(s => {
   console.log(`"${s}" ${validate(s) ? "matches" : "does not match"}`);
});