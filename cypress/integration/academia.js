const CANONICAL_URL = 'https://developer.mongodb.com/academia/';

describe('Academia Page', () => {
    it('should properly render the academia page', () => {
        cy.visitWithoutFetch('/academia/');
        // Make sure something renders on the page
        cy.contains('MongoDB for Academia');
    });
    it('should have a proper canonical url', () => {
        cy.checkCanonicalUrlValue(CANONICAL_URL);
    });
    it('should have a header', () => {
        cy.get('header').within(() => {
            //Title
            cy.get('h2').should('not.be.empty');
            //Description
            cy.get('p').should('not.be.empty');
        });
    });
    it('should properly render some academia benefits', () => {
        cy.get('[data-test="card"]')
            .should('have.length', 2)
            .within(card => {
                //Check content
                cy.checkStandardCardInfo(card);
                // List of benefits
                cy.get('ul > li > p').should('not.be.empty');
            })
            .should('have.attr', 'href');
    });
    it('should properly render grid cards', () => {
        cy.get('[href*="/project/"]')
            .should('have.length', 4)
            .within(card => {
                //Check content
                cy.checkGridCard(card);
            })
            .first()
            .click();
        cy.url().should('include', '/project/');
        cy.go('back');
    });
    it('should properly render see more button', () => {
        cy.get('[href="/academia/students/"]')
            .should('exist')
            .and('not.be.empty')
            .click();
        cy.url().should('include', '/academia/students/');
        cy.go('back');
    });
});
