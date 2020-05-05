export function toBase(num, base) {
    let remainder = [];
    let holder, quotient; 
    let answer = "";

    if (base === 1) {
        return answer = "Infinity"
    } else if (base > 16) {
        return answer = "Range error";
    } 

    quotient = Math.trunc(num / base);
    remainder.push(num % base);

    if (quotient >= base) {
        do {
            remainder.push(quotient % base);
            quotient = Math.trunc(quotient / base);
        } while (quotient >= base)
    }

    remainder.push(quotient);

    holder = remainder.reverse();

    for (let i = 0; i < holder.length; i++) {
        answer += holder[i];
    }
    return answer;
}