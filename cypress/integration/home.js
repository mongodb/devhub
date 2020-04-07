describe('Home Page', () => {
    it('should properly render the home page', () => {
        cy.visit('/');
        cy.contains('Learn MongoDB');
    });
});
