describe('Assignment 7', function(){
    before(function(){
        cy.visit('https://guide.ambetterhealth.com/');

        cy.fixture('Ambetter/data')
        .then(cred => {
            this.cred = cred;
        })

        cy.fixture('Ambetter/locator')
        .then(loc => {
            this.loc = loc;
        })
    });

    it('Set the network and make search for “Dermatology” and state “Florida, USA”', function(){
        
          cy.searchAndClickDetails(this.loc, this.cred)  
          
        
    });

    it('Validate the results count and if  URL contains the searched values', function(){
        
        cy.verifyURL()   
    }); 

    it('Click on ‘Search as Map moves’ toggle and verify the changes in the result', function(){
        
        cy.verifyChanges(this.loc)   
    });

    it('Go to “Advance search” tab', function(){
        
        cy.clickOnAdvancedSearch(this.loc)   
    });

    it('Search by Provider speciality and enter ‘Primary care provider', function(){
        
        cy.searchByProviderSpeciality(this.loc)   
    });

    it('At search page, Sort by Distance and verify.', function(){
        
        cy.verifyDistance()   
    });

    it('View details and then go back to search page.', function(){
        
        cy.clickOnSearchPage()   
    });

    it('Apply Language spoken filter to English and verify the results.', function(){
        
        cy.verifyTheResult()   
    });




});