const CERTIFIED_CHAMPION_LINK = '/community-champions/certified-champion/';
const CERTIFIED_CHAMPION_LOCATION = 'Location';
const CERTIFIED_CHAMPION_NAME = 'Certified Community Champion';
const CERTIFIED_CHAMPION_TITLE = 'Title';
const ENTRY_PAGE = '/community-champions/';

describe('Community Champions Entry Page', () => {
    it('should render a basic entry page', () => {
        cy.visit(ENTRY_PAGE).then(() => {
            cy.contains('MongoDB Community Champions');
        });
    });

    it('should have a grid of champions', () => {
        cy.get('[data-test="champion-grid"]').then(() => {
            cy.get('[data-test="champion-grid-entry"]').should(
                'have.length',
                2
            );
            // Sorted alphabetically
            cy.get('[data-test="champion-grid-entry"]')
                .first()
                .should('have.attr', 'href')
                .and('include', CERTIFIED_CHAMPION_LINK);
            cy.get('[data-test="champion-grid-entry"]')
                .first()
                .within(() => {
                    cy.contains(CERTIFIED_CHAMPION_NAME);
                    cy.contains(CERTIFIED_CHAMPION_TITLE);
                    cy.contains(CERTIFIED_CHAMPION_LOCATION);
                    cy.get('[data-test="profile-image"] > div')
                        .should('have.css', 'background-image')
                        // Check this points to some URL and is not none
                        .and('contain', 'url');
                });
        });
    });
});
