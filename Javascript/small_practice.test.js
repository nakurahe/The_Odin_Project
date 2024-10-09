const { add7, multiply, capitalize, lastLetter } = require('./small_practice');

test('adds 7 to the input number', () => {
    expect(add7(3)).toBe(10);
    expect(add7(-7)).toBe(0);
});

test('multiplies two numbers', () => {
    expect(multiply(3, 4)).toBe(12);
    expect(multiply(-2, 5)).toBe(-10);
});

test('capitalizes the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('toBBnumberOne')).toBe('ToBBnumberOne');
    expect(capitalize('world')).toBe('World');
});

test('returns the last letter of a string', () => {
    expect(lastLetter('hello')).toBe('o');
    expect(lastLetter('W')).toBe('W');
});