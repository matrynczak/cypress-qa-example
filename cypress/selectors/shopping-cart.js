// Adding items to cart window
export const CONTINUE_SHOPPING_BUTTON = '[title="Continue shopping"]';
export const PROCEED_TO_CHECKOUT_BUTTON = '[title="Proceed to checkout"]';



// Checkout cart page
export const QUANTITY_INPUT_BY_PRODUCT = (product) =>
    `//a[contains(text(),"${product}")]/../../..//input[@class="cart_quantity_input form-control grey"]`;
export const DELETE_BUTTON_BY_PRODUCT = (product) =>
    `//a[contains(text(),"${product}")]/../../..//td[@class="cart_delete text-center"]//a`;
