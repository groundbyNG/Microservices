const EXTRA_LOW = 9.325;
const LOW = 37.950;
const MEDIUM = 91.900;
const LARGE = 191.650;
const EXTRA_LARGE = 416.700;

export const countTaxRate = (incomeSum) => {
    if (incomeSum <= EXTRA_LOW) {
        return 10;
    } else if (incomeSum <= LOW) {
        return 15;
    } else if (incomeSum <= MEDIUM) {
        return 25;
    } else if (incomeSum <= LARGE) {
        return 29;
    } else if (incomeSum <= EXTRA_LARGE) {
        return 33;
    }
    return 35;
}