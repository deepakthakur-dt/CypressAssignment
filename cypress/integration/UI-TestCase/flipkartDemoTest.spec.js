/// <reference types="cypress" />
describe('Assignment 2', function(){
    beforeEach(function(){
        cy.visit('https://www.saucedemo.com/');

        cy.fixture('FilpkartDemo/credentials')
        .then(cred => {
            this.cred = cred;
        })

        cy.fixture('FilpkartDemo/locators')
        .then(loc => {
            this.loc = loc;
        })
    });

    it('Login with a valid user name / valid password', function(){

        cy.Login(this.loc, this.cred.username.validUsername,this.cred.validPassword)     
        cy.addToCart(this.loc)   
    });

    it('Adding the item to cart and remove the item', function(){
        cy.Login(this.loc, this.cred.username.validUsername,this.cred.validPassword)
        cy.addToCart(this.loc)
        cy.removeItem(this.loc)
    })

    it('Adding the item to cart and go to checkout and give the userdetials', function(){
        cy.Login(this.loc, this.cred.username.validUsername,this.cred.validPassword)
        cy.addToCart(this.loc)
        cy.checkoutPage(this.loc, this.cred)
        cy.PaymentInfoPage(this.loc, this.cred)
    })
});