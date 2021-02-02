const INITIAL_DROPDOWN_DESCRIPTION = 'Take free courses and become certified!';
const INITIAL_DROPDOWN_HREF = 'https://university.mongodb.com';
const INITIAL_DROPDOWN_TITLE = 'MongoDB University';

const DIRECT_LINK_NAME = 'Documentation';
const DIRECT_LINK_HREF = 'https://docs.mongodb.com/';

const checkFirstDropdown = () => {
    cy.contains('Learn').should('be.visible');
    cy.contains(INITIAL_DROPDOWN_TITLE).should('not.be.visible');
    cy.contains('Learn').click();
    cy.get('ul li')
        .first()
        .within(() => {
            cy.get('a')
                .should('have.attr', 'href')
                .and('equal', INITIAL_DROPDOWN_HREF);
            cy.contains(INITIAL_DROPDOWN_TITLE).should('be.visible');
            cy.contains(INITIAL_DROPDOWN_DESCRIPTION).should('be.visible');
        });
};

const checkDirectLink = () => {
    cy.contains(DIRECT_LINK_NAME)
        .should('have.attr', 'href')
        .and('equal', DIRECT_LINK_HREF);
};

describe('Nav', () => {
    it('should properly render the nav', () => {
        cy.visit('/');
        cy.get('nav').within(() => {
            // Check it has the two types of elements we will test
            // One dropdown and one direct link
            cy.contains('Learn');
            cy.contains(DIRECT_LINK_NAME);
        });
    });
    it('should render dropdown menus', () => {
        cy.get('nav').within(() => {
            checkFirstDropdown();
        });
    });
    it('should render top-level links', () => {
        cy.get('nav').within(() => {
            checkDirectLink();
        });
    });
    it('should be mobile responsive', () => {
        cy.viewport('iphone-5');
        cy.get('nav').within(() => {
            // Nav items should not be visible until the menu is opened
            cy.contains('Learn').should('not.exist');
            cy.contains(DIRECT_LINK_NAME).should('not.exist');
        });
        cy.get('[data-test="mobile-nav-toggle"]').click();
        cy.get('nav').within(() => {
            // Check it has the two types of elements we will test
            // One dropdown and one direct link
            cy.contains(DIRECT_LINK_NAME).should('exist');
            checkFirstDropdown();
            // Close dropdown on mobile and be sure it closes properly
            cy.contains('Learn').click();
            cy.contains(INITIAL_DROPDOWN_TITLE).should('not.be.visible');
            cy.contains(INITIAL_DROPDOWN_DESCRIPTION).should('not.be.visible');
            checkDirectLink();
        });
        cy.viewport(1280, 660);
    });
});
