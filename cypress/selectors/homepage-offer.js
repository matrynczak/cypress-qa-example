export const ADD_TO_CART_BY_PRODUCT_NAME = (product) =>
    `//a[contains(text(),"${product}")]/../../..//a[@title="Add to cart"]`;
