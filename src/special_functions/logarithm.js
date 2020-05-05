// export const logbase = (base) => {
//     /** Log to Base base */
    
//     this.currentNumber += `${number}`
//     this.AnsexpressionHolder = this.Ansexpression

//     if(this.previousNumber === "") {
//         this.currentNumForLog = this.currentNumber.substr(0, this.currentNumLength+1)
//         if (this.currentNumForLog == 1000 || this.currentNumForLog == 1000000 
//         || this.currentNumForLog == 1000000000 || this.currentNumForLog == 1000000000000
//         || this.currentNumForLog == 1000000000000000 || this.currentNumForLog == 1000000000000000000) {
//             this.Ansexpression = '(' + `${Math.ceil(Math.log(this.currentNumForLog)/Math.log(base))}` + ')'
//             return
//         } else {
//             this.Ansexpression = '(' + `${Math.log(this.currentNumForLog)/Math.log(base)}` + ')'
//             return
//         }
//         this.answer = eval(this.Ansexpression)
//     } 
    
//     else if(this.previousNumber !== "") {
//         /**
//          * If log was pressed BEFORE this number
//          * let this number be the new currentNumber,
//          * then evaluate last value and log(currentNumber)
//          * e.g, a + log(x)
//          */ 

//         do {
//             this.dELETcurrentNumForLog = this.currentNumber.substr(0, this.currentNumLength+1)
//             this.logOfCurrentNumberHolder = `${Math.log(this.dELETcurrentNumForLog)/Math.log(base)}`
//             if (this.currentNumber == 1000 || this.currentNumber == 1000000 
//             || this.currentNumber == 1000000000 || this.currentNumber == 1000000000000
//             || this.currentNumber == 1000000000000000 || this.currentNumber == 1000000000000000000) {
            
//                 this.answer = eval(`${this.AnsexpressionHolder + Math.ceil(this.logOfCurrentNumberHolder)}`)
//                 this.currentNumberLengthHolder++
//                 return
//             } else {
                
//                 this.answer = eval(`${this.AnsexpressionHolder + this.logOfCurrentNumberHolder}`)
//                 this.currentNumberLengthHolder++
                
//                 return
//             }
//             //this.answer = eval(this.Ansexpression)

//         } while (this.currentNumLength === (this.currentNumberLengthHolder))
//     }
   
// }

export function log(arr) {
    let logarithm = (Math.log10(arr[0])/Math.log10(arr[1]));
    return logarithm;
}

export function antilog(arr) {
    let number = (Math.pow(arr[0], arr[1]));
    return number;
}

export function ln(val) {
    let naturalLog = Math.log(val);
    return naturalLog;
}

export function aln(val) {
    let antinaturalLog = Math.exp(val);
    return antinaturalLog;
}
