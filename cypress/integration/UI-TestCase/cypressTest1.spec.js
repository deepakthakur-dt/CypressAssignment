describe("My First Cypress Test", function(){


    it("Visits the Sauce Demo Page and check the menu items.....", function(){
        cy.visit("http://automationpractice.com/");
    });

    it("Login into the Site...", function () {
        //Enter user name and password and click on log-in button
        cy.contains('Women').eq(0).trigger('mouseover')
       cy.get('.submenu-container').should('be.hidden').invoke('show')
        cy.get('[title="Evening Dresses"]').eq(0).click()

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
        
        cy.contains('Add to cart').click()
        cy.wait(6000)
        // cy.get('.product-container').click()
        // cy.get('.exclusive').click()
        cy.get('[title="Proceed to checkout"]').click()
        //cy.contains('Printed Dress').should('have.text', title)


        cy.get('@price').then(text => {
            const priceofitem  = text;
            cy.get('.price').eq(0).should('include.text', priceofitem.trim())
        });

        cy.get('@title').then(text => {
            const nameofitem  = text;
            cy.get('.product-name').eq(2).should('include.text', nameofitem.trim())
        });

        cy.get('[title="Proceed to checkout"]').eq(1).click()
        cy.get('#email').type('test-33@test.com')
        cy.get('#passwd').type('test@123')
        cy.get('#SubmitLogin').click()
        cy.get('[name="processAddress"]').click()
        cy.get('#cgv').click()
        cy.get('[name="processCarrier"]').click()
        cy.get('.cart_block').invoke('show')
        cy.get('[title="remove this product from my cart"]').click()
        cy.reload()
        cy.get('.alert').should('have.text', 'Your shopping cart is empty.')
      });

});

