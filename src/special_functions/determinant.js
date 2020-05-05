export function det2x2(arr) {
    return (arr[0][0] * arr[1][1]) - (arr[0][1] * arr[1][0])
}

export function det3x3(arr) {
    return arr[0][0] * ((arr[1][1] * arr[2][2]) - (arr[2][1] * arr[1][2])) - arr[0][1] * ((arr[1][0] * arr[2][2]) - (arr[2][0] * arr[1][2])) + arr[0][2] * ((arr[1][0] * arr[2][1]) - (arr[2][0] * arr[1][1]))
}

