export const getRandomString = (length) => {
    let result = "";
    let allSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
        result += allSymbols.charAt(Math.floor(Math.random() * allSymbols.length));

    return result;
};

export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getNumberOfOptionsIndexes = (element) => {
    return Cypress.$(element).length-1; // sometimes may be need of providing different that 'option' selector, i.e. 2 select lists in the page
};

export const assertionSortingLoop = (arr, sortCondition) => {
    for (let i = 0; i < arr.length; i++) {
        expect(arr[i]).to.eql(arr.sort(sortCondition)[i]);
    }
};
