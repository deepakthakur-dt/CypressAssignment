/// <reference types="cypress" />
describe('Assignment 2', function(){
    beforeEach(function(){
        cy.visit('https://www.saucedemo.com/');

        cy.fixture('Saucedemo/credentials')
        .then(cred => {
            this.cred = cred;
        })

        cy.fixture('Saucedemo/locators')
        .then(loc => {
            this.loc = loc;
        })
    });

    it('Login with a valid user name / valid password', function(){

            cy.multipleLogin(this.loc, this.cred)           
        
         
    });

    it('Login with an invalid user name / valid password ', function(){
        cy.Login(this.loc, this.cred.invalidUsername,this.cred.validPassword)
        cy.error()
        
    });

    it('Login with a valid user name / invalid password', function(){
        cy.Login(this.loc, this.cred.username.validUsername,this.cred.invalidPassword)
        cy.error()
    });

    it('Login with a Invalid user name / invalid password', function(){
        cy.Login(this.loc, this.cred.invalidUsername,this.cred.invalidPassword)
        cy.error();
    });
})