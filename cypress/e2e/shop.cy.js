describe('ShopSmart E2E Test', () => {

    it('User visits homepage', () => {
      cy.visit('/');
      cy.contains('ShopSmart');
    });
  
    it('User scrolls and views content', () => {
      cy.visit('/');
  
      cy.scrollTo('bottom');
  
      cy.contains('Subscribe'); // footer visible
    });
  
    it('User interacts with UI', () => {
      cy.visit('/');
  
      cy.get('button').first().click();
  
      cy.get('body').should('exist');
    });
  
  });