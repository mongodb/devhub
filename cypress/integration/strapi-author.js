const AUTHOR_BIO = 'Short bio';
const AUTHOR_TITLE = 'UI Engineer - NYC';
const AUTHOR_NAME = 'Jordan Stapinski';
const AUTHOR_URL = '/author/jordan-stapinski/';

describe('Author Page', () => {
    it('should show an image for the author', () => {
        cy.visit(AUTHOR_URL);
        cy.get('[data-test="author-image"]').should('exist');
        cy.get('[data-test="author-image"]').within(() => {
            cy.get('div')
                .should('have.css', 'background-image')
                .should('not.be.empty');
        });
    });
    it('should display a name and description for the author', () => {
        cy.get('header').within(() => {
            cy.contains(AUTHOR_NAME);
            cy.contains(AUTHOR_BIO);
            cy.contains(AUTHOR_TITLE);
        });
    });
    // TODO: Fill in once Strapi articles are available, or we swap authors
    xit('should show articles for this author', () => {
        cy.get('[data-test="card"]')
            .first()
            .then(card => {
                cy.checkArticleCard(card);
            });
    });
});
