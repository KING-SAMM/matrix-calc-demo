import {square} from './squares.js'

export function simplify_surd(x) {
    let surd
    if (x == 1) {
        surd = [1, "", 1]
        return surd
    } 
    
    if (x != 1) {
        let quotient
        surd = [1, "√", x]   // Original surd

        for (let j = 2; j < (x); j++) {
            quotient = x/j
            for (let i = 1; i < (x); i++) {
                // If x contains a perfect square, simplify the surd
                if (quotient === square(i)) {
                    surd = [i, "√", j]
                    return surd
                }
                // If x is a perfect square, return the integer square root
                if (x === square(i)) {
                    surd = [i, "", 1]
                    return surd
                }
            }
        }
        // If x is neither a perfect square nor contains one, return original surd
        return surd
    } 
}
