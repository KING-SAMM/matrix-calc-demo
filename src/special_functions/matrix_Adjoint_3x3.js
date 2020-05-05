
export const adjoint3x3 = (detArr) => {
    let Arr = [[],[],[]]
    let Arr2 = [[],[],[]]

    // Matrix of cofactors, shortcut method
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 2; j++) {
            detArr[i].push(detArr[i][j])
            
            let k = 3
            let l = 0
            while(k < 5) {
                detArr[k] = detArr[l]
                l++
                k++
            }
        }
    }

    for(let p = 1, n = 0; p < 4; p++, ++n) {
        for(let q = 1, r = 0; q < 4; q++, ++r){
            Arr[n].push((detArr[p][q] * detArr[p + 1][q + 1]) - (detArr[p + 1][q] * detArr[p][q + 1]))
        }
    }

    // Transpose of matrix of cofactors
    let rows = 3
    let cols = 3
    for (let s = 0; s < rows; s++) {
        let columns = []
        for (let t = 0; t < cols; t++) {
            columns[t] = Arr[t][s]           
        }
        Arr2[s] = columns
    }

    return Arr2

}
    