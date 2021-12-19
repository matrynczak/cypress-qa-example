SHOPPING CART OVERLAY:
* Check if all of the buttons are in place (Continue shopping and Proceed to checkout) + added product info + image + all of the texts which should be in this window
* Compare data in the right part (data from Cart) with the current Cart state (if this is the same)
* Check if Continue shopping button moves user back to offer and if added item is in the Cart
* Check if Proceed to checkout button moves user to cart page and added item is in the Cart

SHOPPING-CART SUMMARY:
* Check if all of the columns and rows are in place 
* Check if all of the previously added items are in the table, including items details 
* Check if data of items (price, quantity) are the same as I selected previously
* Check interactions with quantity inputs (text input and + - buttons) 
* Check delete button (trash icon) interactions – if it removes all of the items of such type (not reducing by 1 for example)
* Check calculations of Total products, Total shipping, Total, Tax and Total cells -> by manipulating the items quantity 
* Check if cart becomes empty once all of the items are being removed
* Compare the item amount with the text in the top “Your shopping cart contains: X Product”
* Check the discount correctness (if applied) – connected with checking the Total value
* Check the validation of quantity input – including max number which I am able to type
* Check if items links redirects me to right place in the page
* Check if the data of delivery address and invoice address are correct – in case of logged in user

CHECKOUT PROCESS:

    Sign in:
* Check if I can go further without account, so:
    -	Click on register in Sign in step
    -   Register the user --- this should be covered by different set of tests
    -   Go further to Address step – currently it moves user to Summary but in my opinion it should move user to Address directly
* Check if I can go further with login in Sign in step, to Address step
* Check whether I can go from Summary to Address directly if I am logged in already


    Address:
* Change the option of delivery address (so it’s not the same as billing address) -> updating the address
* Updating delivery address -> if move me back to Address with new address
* Updating billing address -> if move me back to Address with new address
* Check if the option Add a new address allows to add new address which will be immediately presented in Address step
* Validating the order comment input 


    Shipping:
* Manipulating the ship options (it’s only one here so there is no area to test any different option but normally I would do that)
* Check if can go to Payment without accepting terms of service 
* Check if I can read Terms of Service – check the url and if it’s being opened successfully


    Payment:
* Check if all of the details in Payment are the same as in the Summary tab
* Check if I can go back by click Continue shopping button ---- it’s likely wrong text in the button
* Check if can pay using Pay by bank wire option
    -	Check if all details are of that option are correct 
    -	Check the data on the last step of Pay by bank wire
    -	Check if I get the confirmation of order completion 
* Check if can back to orders from last step 
* Check if can pay using Pay by check option
    -	Check if all details are of that option are correct 
    -	Check the data on the last step of Pay by bank check 
    -	Check if I get the confirmation of order completion 


    General checkout paths:
* Check if I can go to any step of checkout process without losing the previously provided data
* Check the happy path for 
    -   logged in user,
    -	user without the account,
    -	user with account but non-logged in.

For all of the kind of users test every shipping option and every payment option --- probably using some matrix (to cover all of the combinations)

![Alt text](./Screenshot 2021-12-19 at 18.57.16.png?raw=true "Possible scenarios of checkout process - happy paths")


* Check if user can log out during the checkout process and if he/she is informed about losing the data of cart/checkout process.


