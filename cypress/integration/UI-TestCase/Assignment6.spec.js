describe('Assignment 6', function(){
    beforeEach(function(){
        cy.visit('http://automationpractice.com/');

        cy.fixture('FilpkartDemo/credentials')
        .then(cred => {
            this.cred = cred;
        })

        cy.fixture('FilpkartDemo/locators')
        .then(loc => {
            this.loc = loc;
        })
    });

    it('Navigate the website and validate', function(){
        cy.urlValidation()
          
        
        
    });

    it('sign up for the user ', function(){
        
        cy.signUpPage(this.loc, this.cred)  
        
    });

    it.only('sign in validation and clicking on evening dress ', function(){
        
        cy.signinValidation(this.loc) 
        cy.selectEveningDress(this.loc) 
        cy.lastProcess(this.loc) 
        
    });
});