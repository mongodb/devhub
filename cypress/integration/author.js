const AUTHOR_NAME = 'Maxime Beugnet';
const AUTHOR_URL = '/author/maxime-beugnet/';

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
            // Description is the only 'p' in the header and content can change
            cy.contains('p').should('not.be.empty');
        });
    });
    it('should show articles for this author', () => {
        cy.get('[data-test="card"]')
            .first()
            .then(card => {
                cy.checkArticleCard(card);
            });
    });
    it('should have a uniq h1 tag', () => {
        cy.get('h1').should('have.length', 1)
    });
});
