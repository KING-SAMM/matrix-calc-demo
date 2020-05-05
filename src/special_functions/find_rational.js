// Convert numeric value to rational numeric string

export const find_rational = (value) => {
    let best_numer = 1
    let best_denom = 1
    let best_err = Math.abs(value - best_numer / best_denom)
    for (let denom = 1; best_err > 0 && denom <= 10000; denom++) {
        let numer = Math.round(value * denom)
        let err = Math.abs(value - numer / denom)
        if (err < best_err) {
            best_numer = numer
            best_denom = denom
            best_err = err;
            console.log(best_numer + " / " + best_denom + " = " + (best_numer/best_denom) + " error " + best_err)
        }
    }
    if (best_denom === 1) {
        return [best_numer]
    }
    return [best_numer, best_denom]
}

export const find_rational2 = (value) => {
    // finding rational where the numerator has to stay on top even if denominator is 1
    let best_numer = 1
    let best_denom = 1
    let best_err = Math.abs(value - best_numer / best_denom)
    for (let denom = 1; best_err > 0 && denom <= 10000; denom++) {
        let numer = Math.round(value * denom)
        let err = Math.abs(value - numer / denom)
        if (err < best_err) {
            best_numer = numer
            best_denom = denom
            best_err = err;
            console.log(best_numer + " / " + best_denom + " = " + (best_numer/best_denom) + " error " + best_err)
        }
    }
    if (best_denom === 1) {
        return [best_numer, ""]
    }
    return [best_numer, best_denom]
}

