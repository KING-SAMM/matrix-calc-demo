
// Factorial of 0 and positive integers
export function fact(x) {
    if (x == 0 || x == 1) {
        return 1
    } else {
        return x * fact(x - 1)
    }
}
export function combination(n, r) {
    return fact(n)/(fact(n - r) * fact(r))
}

export function permutation(n, r) {
    return fact(n)/fact(n - r) 
}