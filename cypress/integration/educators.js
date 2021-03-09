const CANONICAL_URL = 'https://developer.mongodb.com/academia/educators/';

describe('Educators Page', () => {
    it('should properly render the educators page', () => {
        cy.visitWithoutFetch('/academia/educators/');
        // Make sure something renders on the page
        cy.contains('MongoDB Academia for Educators');
    });
    it('should have a proper canonical url', () => {
        cy.checkCanonicalUrlValue(CANONICAL_URL);
    });
    it('should have a proper header', () => {
        cy.get('header').within(() => {
            //Title
            cy.get('h2').should('not.be.empty');
            //Description
            cy.get('p').should('not.be.empty');
            cy.checkBreadcrumbs();
        });
    });

    it('should clickable buttons', () => {
        cy.get('button').each(el => {
            cy.get(el).should('not.be.empty').click();
            cy.closeModal();
        });
    });

    it('should have a second header', () => {
        cy.get('h3').should('not.be.empty');
    });
    it('should have a benefits section', () => {
        cy.get('div[class*="FeaturedBenefit"]')
            .should('have.length', 3)
            .within(() => {
                // Image
                cy.get('img').should('have.attr', 'src').should('not.be.empty');
                // Title
                cy.get('h5').should('not.be.empty');
                // List of benefits
                cy.get('ul > li > p').should('not.be.empty');
            });
    });
    it('should have a Eligibility section', () => {
        cy.get('div[class*="EligibilitySection"]')
            .should('exist')
            .within(() => {
                // Title
                cy.get('h4').should('not.be.empty');
                // Description
                cy.get('span > p').should('not.be.empty');
                // Lists
                cy.get('ul > li > p')
                    .should('have.length', 2)
                    .and('not.be.empty');
                cy.get('ol > li > p')
                    .should('have.length', 4)
                    .and('not.be.empty');
            });
    });

    //TODO: Form test
});
