
export function scalarMultiply(arr){
    let num
    return arr *= num
}

export function scalarMultiplyArray(arr, rows){
    let arr2 = []
    for(let i = 0; i < rows; i++) {
        arr2[i] = arr[i].map(scalarMultiply(arr))
    }
return arr2
}