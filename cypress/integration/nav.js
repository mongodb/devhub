const INITIAL_DROPDOWN_DESCRIPTION = 'Take free courses and become certified!';
const INITIAL_DROPDOWN_HREF = 'https://university.mongodb.com';
const INITIAL_DROPDOWN_TITLE = 'MongoDB University';

describe('Nav', () => {
    it('should properly render the nav', () => {
        cy.visit('/');
        cy.get('nav').within(() => {
            // Check it has the two types of elements we will test
            // One dropdown and one direct link
            cy.contains('Learn');
            cy.contains('Documentation');
        });
    });
    it('should render dropdown menus', () => {
        cy.get('nav').within(() => {
            cy.contains(INITIAL_DROPDOWN_TITLE).should('not.be.visible');
            cy.contains('Learn').click();
            cy.get('ul li')
                .first()
                .within(() => {
                    cy.get('a')
                        .should('have.attr', 'href')
                        .and('equal', INITIAL_DROPDOWN_HREF);
                    cy.contains(INITIAL_DROPDOWN_TITLE).should('be.visible');
                    cy.contains(INITIAL_DROPDOWN_DESCRIPTION).should(
                        'be.visible'
                    );
                });
        });
    });
    it('should render top-level links', () => {});
    it('should be mobile responsive', () => {});
});
