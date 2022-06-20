// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

//const { first } = require("cypress/types/lodash");

//  --This is Login command --
   Cypress.Commands.add('multipleLogin', (locator, credential) => {
    for(let i in credential.username){
        cy.Login(locator, credential.username[i],credential.validPassword)
        // cy.get(locator.Login.username).type(credential.username[i])
        // cy.get(locator.Login.password).type(credential.validPassword)
        // cy.get(locator.Login.loginButton).click()
        cy.Logout();
    }
    });

    Cypress.Commands.add('Login', (locator, email,password) => {
    cy.get(locator.Login.username).type(email)
    cy.get(locator.Login.password).type(password)
    cy.get(locator.Login.loginButton).click()
    
    });

//  -- This error validation command --
   Cypress.Commands.add('error', () => {
    cy.get('[data-test="error"]').should('contain.text', 'Epic sadface: Username and password do not match any user in this service')})

//  -- This is Logout command --
    Cypress.Commands.add('Logout', () => {cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()});


//  -- This is add to cart command --
    Cypress.Commands.add('addToCart',(locator) => {
        cy.get(locator.firstitem).first().click()
        cy.get(locator.itemtitle).first().invoke('text').as('title')
        cy.get(locator.itemprice).first().invoke('text').as('price')
        cy.get(locator.addtocartbtn).first().click()
        cy.get(locator.carticon).click()

        cy.get('@title').then(text => {
            const itemtitle  = text;
            cy.get(locator.cartpage.title).should('have.text', itemtitle)
        });

        cy.get('@price').then(text => {
            const itemprice  = text;
            cy.get(locator.cartpage.price).should('have.text', itemprice)
        });
        
        //cy.Logout();
    });  

    Cypress.Commands.add('removeItem',(locator) => {

        cy.get(locator.removebtn).click()
        cy.get(locator.removeditemincart).should('be.empty')
    });

    Cypress.Commands.add('checkoutPage',(locator, data) => {
        
        cy.get(locator.checkoutbtn).click()
        
        for(var i in locator.userdetails){
            cy.get(locator.userdetails[i]).click().type("test")
        }
        cy.get(locator.continuebtn).click()       
    });

    Cypress.Commands.add('PaymentInfoPage',function(locator, credentials) {

        cy.get(locator.paymentPage.title).should('have.text', this.title)
        cy.get(locator.paymentPage.price).should('have.text', this.price)

       // cy.get(locator.payinfo).eq(0).should('include.text',credentials.paymentinfo)
       // cy.get(locator.payinfo).eq(1).should('have.text',credentials.shippinginfo)
       // cy.get(locator.totalvalue).should('include.text',credentials.total)
    })


//  -- These are commanda for Assignment 6 --------

    Cypress.Commands.add('urlValidation',() =>{

        cy.url().should('be.equal','http://automationpractice.com/index.php')
        cy.title().should('eq','My Store')
    }) 
    
    Cypress.Commands.add('signUpPage',(locator, data) =>{
        cy.get(locator.signInBtn).click()
        cy.get(locator.enterEmail).type("test-39@test.com")
        cy.get(locator.createAccountBtn).click()
        cy.wait(5000)
        cy.get(locator.gender).click()

        for( let i in locator.personalInformation){
            cy.get(locator.personalInformation[i]).type("test")
        }

        cy.get(locator.password).type('test@123')

        for(let i in locator.Address){
            cy.get(locator.Address[i]).type("test")
        }   

        cy.get(locator.state).select('Alaska')
        cy.get(locator.zipCode).type('20130')
        cy.get(locator.mobile).type("7928920076")
        cy.get(locator.alias).type('alias')
        cy.get(locator.register).click()
     })

     Cypress.Commands.add('signinValidation',(locator,) =>{
         cy.get(locator.signIn).click()
         cy.get(locator.email).type('test-38@test.com')
         cy.get(locator.pass).type('test@123')
         cy.get(locator.submit).click()
         cy.get(locator.homepage).should('contain.text', 'test')
     })

     Cypress.Commands.add('selectEveningDress',(locator) =>{
        cy.contains('Women').eq(0).trigger('mouseover')
        cy.get('.submenu-container').should('be.hidden').invoke('show')
        cy.get(locator.eveningdress).eq(0).click()
        
    })

    Cypress.Commands.add('lastProcess',(locator) =>{

        //cy.get(locator.item-name).first().invoke('text').as('title')
        cy.get('.product-name').eq(2).invoke('text').as('title')
        cy.get('@title').then(text => {
          const nameofitem  = text;
          cy.log(nameofitem)
        });

        cy.get('.price').eq(4).invoke('text').as('price')
        cy.get('@price').then(text => {
          const priceofitem  = text;
          cy.log(priceofitem)
      });
        //cy.get(locator.itemprice1).first().invoke('text').as('price')
        // cy.get(locator.firstItem).click()
        cy.contains('Add to cart').click()
        cy.wait(6000)
        cy.get(locator.proceedCheckoutBtn).click()

        cy.get('@price').then(text => {
            const priceofitem  = text;
            cy.get('.price').eq(0).should('include.text', priceofitem.trim())
        });

        cy.get('@title').then(text => {
            const nameofitem  = text;
            cy.get('.product-name').eq(2).should('include.text', nameofitem.trim())
        });

        cy.get(locator.proceedCheckoutBtn).eq(1).click()
        cy.get(locator.proceedToPayment).click()
        cy.get(locator.checkbox).click()
        cy.get(locator.proceedToPayment2).click()
        cy.get(locator.viewCart).should('be.hidden').invoke('show')
        try {
            cy.get(locator.removeTheProduct).click()
        } catch (error) {
            cy.log(error)
        }
        //cy.get(locator.removeTheProduct).click({force:true})
        cy.wait(3000)
        cy.reload()
        cy.get(locator.emptyCartMessage).should('have.text', 'Your shopping cart is empty.')

    })


    //  -- These are commanda for Assignment 7 --------


    Cypress.Commands.add('searchAndClickDetails',(locator, data) =>{

        cy.get(locator.DontHavePlanButton).eq(2).click()
        cy.get(locator.state).type('Florida{enter}')
        cy.get("div").contains("Filter by county").click()
        cy.get('[role="listbox"]').find('li').contains('Broward').click()
        cy.get(locator.continuebtn).eq(1).click()
         cy.get(locator.network).click()
         cy.get(locator.continuebtn).eq(1).click()
         cy.get('[data-testid="queryInput"]').find('[type="text"]').type('Dermatologist')
         cy.get('[placeholder="Location"]').clear().type('Florida')
         cy.get('[class="pac-item-query"]').first().click({force : true}).wait(1000)
         //cy.get('[data-testid="locationInput"]').clear().type('Florida').first().click()
        //cy.get("[field='[object Object]']").find('[data-testid="locationInput"]').clear().type('Florida')
        //cy.get("[class='pac-container pac-logo']").find('div').first().click().wait(2000);
         cy.get(locator.continuebtn).eq(1).find('div').contains('Search').click()
         cy.wait(5000)
    }) 


    Cypress.Commands.add('verifyURL',() =>{

        cy.url().should('include', 'dermatologist')
        cy.url().should('include', 'FL')
    })

    Cypress.Commands.add('verifyChanges',(locator) =>{

        cy.get('.css-18oxkhi').find('[type="checkbox"]').check()
       
    })

    Cypress.Commands.add('clickOnAdvancedSearch',(locator)=>{

        cy.get('[href="/advanced-search"]').contains('Advanced Search').click()
    })

    Cypress.Commands.add('searchByProviderSpeciality',(locator)=>{

        cy.get('[placeholder="Ex. OBGYN, Internist"]').type('Primary Care Provider')
        cy.get('[role="listbox"]').find("[role='menuitem']").contains('Primary Care Provider').click()
        cy.get('.css-1n6muco').contains('Submit').click()
    })

    Cypress.Commands.add('verifyDistance',()=>{

        cy.get('[data-testid="resultMilesAway"]').first().invoke('text').as('miles')
        
        cy.get('[name="ArrowDropDown"]').click()
        cy.get(".css-1dw6r2y").contains('Distance').click()
        cy.wait(10000);
        cy.get('@miles').then(text => {
        const miles = text;
        cy.log(miles)
        cy.get("[data-testid='searchResults']").find("[data-testid='resultMilesAway']").first().should('have.text', miles);
        
    })
})

    Cypress.Commands.add('clickOnSearchPage',()=>{

        cy.get("[data-testid='searchResults'").find("[data-testid='signature-link']").first().invoke('text').as('name');
        cy.get("[data-testid='specialties']").first().invoke('text').as('speciality');
        cy.get("[data-testid='searchResults'").find("[class='css-1erqcfs']").contains('View profile').first().click();
        cy.get('@name').then(medical => {
        cy.get('@speciality').then(spec => {
            const name = medical;
            const department = spec;
            cy.get('div.css-roynbj').find("[data-copytype='provider name']").should('have.text', name);
            cy.get("[data-testid='specialties-list']").should('have.text', department);
        })
    })
        cy.get("div.css-16idgeo").should('have.text', 'Back').click();
        cy.wait(5000)
    })

    Cypress.Commands.add('verifyTheResult', ()=>{
        cy.get('[data-testid="filters-label"]').click();
        cy.get(".css-n7257k").eq(2).type('English{enter}')
        cy.get('[data-testid="applyButton"]').click()
        
    })









//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
