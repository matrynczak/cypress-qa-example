import * as FOOTER from '../selectors/footer';
import * as CONTACT_FORM from '../selectors/contact-us-form';
import {getNumberOfOptionsIndexes, getRandomNumber, getRandomString} from "../support/help-methods";
import randomEmail from 'random-email';
import RandExp from 'randexp';

const successConfirmationMsg = 'Your message has been successfully sent to our team.';
const failAlertMsg = 'There is 1 error';
const errorsMessages = {
    missingSubject: 'Please select a subject from the list provided. ',
    invalidEmail: 'Invalid email address.',
    blankMessage: 'The message cannot be blank.'
};
const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const emailRegexpNegation = /(?!^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$).*/;


describe('Assesment exercises - contact-form', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get(FOOTER.LINK_BY_NAME('Contact us')).click();
    });

    it('Send message - with all minimum required fields - message sent', () => {
        cy.get(CONTACT_FORM.SUBJECT_HEADING_DD).select(getRandomNumber(1, getNumberOfOptionsIndexes('option')));
        cy.get(CONTACT_FORM.EMAIL_INPUT).type(randomEmail());
        cy.get(CONTACT_FORM.MESSAGE_INPUT).type(getRandomString(300));
        cy.get(CONTACT_FORM.SUBMIT_BUTTON).click();
        cy.get(CONTACT_FORM.SUCCESS_CONFIRMATION).should('be.visible').and('have.text', successConfirmationMsg);
    });

    it('Send message - with all available fields - message sent', () => {
        cy.get(CONTACT_FORM.SUBJECT_HEADING_DD).select(getRandomNumber(1, getNumberOfOptionsIndexes('option')));
        cy.get(CONTACT_FORM.EMAIL_INPUT).type(randomEmail());
        cy.get(CONTACT_FORM.ORDER_REF_INPUT).type(getRandomString(15));
        cy.get(CONTACT_FORM.FILE_UPLOAD_INPUT).attachFile('test.png');
        cy.get(CONTACT_FORM.MESSAGE_INPUT).type(getRandomString(300));
        cy.get(CONTACT_FORM.SUBMIT_BUTTON).click();
        cy.get(CONTACT_FORM.SUCCESS_CONFIRMATION).should('be.visible').and('have.text', successConfirmationMsg);
    });

    it('Send message - without subject heading - message not sent', () => {
        cy.get(CONTACT_FORM.EMAIL_INPUT).type(randomEmail());
        cy.get(CONTACT_FORM.MESSAGE_INPUT).type(getRandomString(50));
        cy.get(CONTACT_FORM.SUBMIT_BUTTON).click();
        cy.get(CONTACT_FORM.FAIL_ALERT).should('be.visible');
        cy.get(CONTACT_FORM.FAIL_ALERT).find('p').should('have.text', failAlertMsg);
        cy.get(CONTACT_FORM.FAIL_ALERT).find('li').should('have.text', errorsMessages.missingSubject);
    });

    it('Send message - without email address - message not sent', () => {
        cy.get(CONTACT_FORM.SUBJECT_HEADING_DD).select(getRandomNumber(1, getNumberOfOptionsIndexes('option')));
        cy.get(CONTACT_FORM.MESSAGE_INPUT).type(getRandomString(50));
        cy.get(CONTACT_FORM.SUBMIT_BUTTON).click();
        cy.get(CONTACT_FORM.FAIL_ALERT).should('be.visible');
        cy.get(CONTACT_FORM.FAIL_ALERT).find('p').should('have.text', failAlertMsg);
        cy.get(CONTACT_FORM.FAIL_ALERT).find('li').should('have.text', errorsMessages.invalidEmail);
    });

    it('Send message - with invalid email address - message not sent', () => {
        cy.get(CONTACT_FORM.SUBJECT_HEADING_DD).select(getRandomNumber(1, getNumberOfOptionsIndexes('option')));
        cy.get(CONTACT_FORM.EMAIL_INPUT).type('aaa@aaa');
        cy.get(CONTACT_FORM.MESSAGE_INPUT).type(getRandomString(50));
        cy.get(CONTACT_FORM.SUBMIT_BUTTON).click();
        cy.get(CONTACT_FORM.FAIL_ALERT).should('be.visible');
        cy.get(CONTACT_FORM.FAIL_ALERT).find('p').should('have.text', failAlertMsg);
        cy.get(CONTACT_FORM.FAIL_ALERT).find('li').should('have.text', errorsMessages.invalidEmail);
    });

    it('Send message - without message - message not sent', () => {
        cy.get(CONTACT_FORM.SUBJECT_HEADING_DD).select(getRandomNumber(1, getNumberOfOptionsIndexes('option')));
        cy.get(CONTACT_FORM.EMAIL_INPUT).type(randomEmail());
        cy.get(CONTACT_FORM.SUBMIT_BUTTON).click();
        cy.get(CONTACT_FORM.FAIL_ALERT).should('be.visible');
        cy.get(CONTACT_FORM.FAIL_ALERT).find('p').should('have.text', failAlertMsg);
        cy.get(CONTACT_FORM.FAIL_ALERT).find('li').should('have.text', errorsMessages.blankMessage);
    });

    it('Send message - without subject, email and message - message not sent', () => {
        cy.get(CONTACT_FORM.SUBMIT_BUTTON).click();
        cy.get(CONTACT_FORM.FAIL_ALERT).should('be.visible');
        cy.get(CONTACT_FORM.FAIL_ALERT).find('p').should('have.text', failAlertMsg);
        cy.get(CONTACT_FORM.FAIL_ALERT).find('li').eq(0).should('have.text', errorsMessages.missingSubject);
        cy.get(CONTACT_FORM.FAIL_ALERT).find('li').eq(1).should('have.text', errorsMessages.invalidEmail);
        cy.get(CONTACT_FORM.FAIL_ALERT).find('li').eq(2).should('have.text', errorsMessages.blankMessage);
    });

    //TODO below 2 test cases have to be performed on the lower level of tests - for sure not e2e tests; added only to show the awareness of this need
    it('Positive validation of email input', () => {
        cy.get(CONTACT_FORM.EMAIL_INPUT).type(new RandExp(emailRegexp).gen(), { parseSpecialCharSequences: false });
        cy.get(CONTACT_FORM.MESSAGE_INPUT).click();
        // it sometimes fails - mail input seems to fail with the W3C email regexp
        cy.get(CONTACT_FORM.EMAIL_INPUT).parent().should('have.class', 'form-group form-ok');
    });

    it('Negative validation of email input', () => {
        cy.get(CONTACT_FORM.EMAIL_INPUT).type(new RandExp(emailRegexpNegation).gen(), { parseSpecialCharSequences: false });
        cy.get(CONTACT_FORM.MESSAGE_INPUT).click();
        cy.get(CONTACT_FORM.EMAIL_INPUT).parent().should('have.class', 'form-group form-error');
    });

    //TODO there should be also need of testing validation of uploaded file format - but I have no idea what files are/are not accepted in this form
    //TODO I was able to upload every type of file
});
