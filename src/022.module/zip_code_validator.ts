// 구현체

import { StringValidator } from './string_validator';

export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

/*
class ZipCodeValidator { ... }
export { ZipCodeValidator as mainValidator };
 */