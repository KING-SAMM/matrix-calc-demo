import {square} from './squares.js'
import {find_rational} from './find_rational.js'
import {det3x3} from './determinant.js'

export function eigenvalues2x2(arr) {
    var eValue1
    var eValue2
    var a = 1
    var b = (-1 * arr[0][0]) + (-1 * arr[1][1])
    var c = -1 * (arr[0][1] * arr[1][0]) + (arr[0][0] * arr[1][1]) 

    if((square(b) - (4 * a * c)) >= 0) {
        // Factorize using quadratic formula
        eValue1 = ((-1 * b) + Math.sqrt(square(b) - (4 * a * c)))/ (2 * a)
        eValue2 = ((-1 * b) - Math.sqrt(square(b) - (4 * a * c)))/ (2 * a)

        eValue1 = find_rational(eValue1).join("/")
        eValue2 = find_rational(eValue2).join("/")

        return [eValue1, eValue2]

    } else if((square(b) - (4 * a * c)) < 0) {
        eValue1 = "Complex Values"
        return [eValue1]
    } 
}

export function eigenvalues3x3(arr) {
    var eValue1
    var eValue2
 
    var a = 1
    var b = -1 * (arr[0][0] + arr[1][1] + arr[2][2])
    var c = det3x3(arr) 

    if((square(b) - (4 * a * c)) >= 0) {
        // Factorize using quadratic formula
        eValue1 = ((-1 * b) + Math.sqrt(square(b) - (4 * a * c)))/ (2 * a)
        eValue2 = ((-1 * b) - Math.sqrt(square(b) - (4 * a * c)))/ (2 * a)

        eValue1 = find_rational(eValue1).join("/")
        eValue2 = find_rational(eValue2).join("/")

        return [eValue1, eValue2]

    } else if((square(b) - (4 * a * c)) < 0) {
        eValue1 = "Complex Values"
        return [eValue1]
    } 
}