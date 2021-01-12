const numberRegexp = /^[0-9]+$/;

// 함수를 export함 
export default function (s: string) {
    return s.length === 5 && numberRegexp.test(s);
}
