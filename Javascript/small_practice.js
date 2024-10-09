function add7(param1) {
    return param1 + 7;
}

function multiply(param1, param2) {
    return param1 * param2;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function lastLetter(str) {
    return str.slice(-1)
}

module.exports = { add7, multiply, capitalize, lastLetter };