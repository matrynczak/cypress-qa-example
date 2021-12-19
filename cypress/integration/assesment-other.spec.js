import * as SEARCH from '../selectors/search-bar';
import * as PRODUCT_LIST from '../selectors/product-list';
import * as HOMEPAGE_OFFER from '../selectors/homepage-offer';
import * as SHOPPING_CART from '../selectors/shopping-cart';
import * as NAV_BAR from '../selectors/nav-bar';
import * as COMPARISON_PAGE from '../selectors/comparison-page';
import * as FOOTER from '../selectors/footer';
import {assertionSortingLoop} from "../support/help-methods";

describe('Assesment exercises - others', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  //TODO actually there is no "shirt" in the offer - not sure if I should search nothing; that's why took the closest item - T-shirt
  //TODO don't know if should open shirt page or just check if shirt has been found - I selected 2nd option
  it('Searching "shirt" using search bar', () => {
    cy.get(SEARCH.INPUT).type('shirt');
    cy.get(SEARCH.SUBMIT).click();
    cy.url().should('contain', '?controller=search&orderby=position&orderway=desc&search_query=shirt&submit_search=');
    cy.get(PRODUCT_LIST.GRID).find('h5').each($elem => {
      cy.wrap($elem).should('contain.text', 'shirt');
    })
  });

  //TODO I'm not sure if any assertion should be here - no info in the email with instructions
  //TODO used first() since there is no comment which item should be selected, so taking first suitable from list
  it('Adding items to cart and editing quantity', () => {
    cy.xpath(HOMEPAGE_OFFER.ADD_TO_CART_BY_PRODUCT_NAME('shirt')).first().click();
    cy.get(SHOPPING_CART.CONTINUE_SHOPPING_BUTTON).click();
    cy.xpath(HOMEPAGE_OFFER.ADD_TO_CART_BY_PRODUCT_NAME('Dress')).first().click();
    cy.get(SHOPPING_CART.PROCEED_TO_CHECKOUT_BUTTON).click( );
    cy.xpath(SHOPPING_CART.QUANTITY_INPUT_BY_PRODUCT('shirt')).type('2');
    cy.xpath(SHOPPING_CART.DELETE_BUTTON_BY_PRODUCT('Dress')).click();
    cy.xpath(SHOPPING_CART.DELETE_BUTTON_BY_PRODUCT('Dress')).should('not.exist');
    cy.url().should('contain', '?controller=order');
  });

  //TODO don't know if I should only add 2 items to compare or log some summary of difference
  it('Compare the features of 2 clothing items', () => {
    cy.get(NAV_BAR.NAV_ITEM('Women')).click(); // alternative is cy.contains('Women').click(); but I prefer cy.get()
    cy.get(PRODUCT_LIST.ADD_TO_COMPARE_BUTTON).then(list => {
      if(list.length>1) {
        cy.wrap(list[0]).click();
        cy.get(PRODUCT_LIST.COMPARE_SUBMIT_TOP_BUTTON_ACTIVE); // to wait for adding the first item, without that it's adding only 2nd item - too fast click
        cy.wrap(list[list.length-1]).click();
      }
      else {
        cy.log('There is only one item in the list - comparison not possible');
      }
    });
    cy.get(PRODUCT_LIST.COMPARE_SUBMIT_TOP_BUTTON_ACTIVE).click();
    cy.url().should('contain', '?controller=products-comparison&compare_product_list=');
    cy.get(COMPARISON_PAGE.COMPARISON_TABLE).should('be.visible');
  });

  //TODO did not want to add external librares like lodash to check identity - just use 'for' loop
  it('Go to BestSellers and filtering by highest price', () => {
    cy.get(FOOTER.LINK_BY_NAME('Best sellers')).click();
    cy.get(PRODUCT_LIST.SORT_BY_DROPDOWN).select('price:desc');
    cy.get(PRODUCT_LIST.PRICE).then($elem => {
      const arr = Array.from($elem, e => e.innerText);
      assertionSortingLoop(arr, (a, b) => a - b);
    });
  })
});
