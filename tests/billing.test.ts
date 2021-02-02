import {calculateCost} from "../services/support/libs/support-libs"

test('Lowest tier', () => {
    const tier = 1;

    const expectedCost = 500;

    const calculatedCost = calculateCost(tier);

    expect(calculatedCost).toEqual(expectedCost);
});

test('Middle tier', () => {
    const tier = 2;

    const expectedCost = 1000;

    const calculatedCost = calculateCost(tier);

    expect(calculatedCost).toEqual(expectedCost);
});

test('Highest tier', () => {
    const tier = 3;

    const expectedCost = 2000;

    const calculatedCost = calculateCost(tier);

    expect(calculatedCost).toEqual(expectedCost);
});
