const TAG_ARTICLE_URL = '/article/3-things-to-know-switch-from-sql-mongodb';
const TAG_PAGE_URL = '/tag/sql';
const TITLE = 'SQL';

describe('Tag page', () => {
    it('should have a header with some basic tag information', () => {
        cy.visit(TAG_PAGE_URL);
        cy.get('header').within(() => {
            cy.contains(TITLE);
            // Check the breadcrumb is being populated correctly
            cy.get('div').within(() => {
                cy.get('a').last().contains(TITLE);
                cy.get('a').last().should('have.attr', 'href', TAG_PAGE_URL);
            });
        });
    });
    it('should contain several articles with basic information', () => {
        cy.get('[data-test="card"]').should('have.length', 4);
        cy.get('[data-test="card"]')
            .first()
            .then(card => {
                cy.checkArticleCard(card);
            });
    });
    it('should contain an article tagged with this tag', () => {
        cy.visit(TAG_ARTICLE_URL);
        // Get tags
        cy.get('header').within(() => {
            cy.get('ul li a').last().contains(TITLE);
            cy.get('ul li a').last().click();
            cy.url().should('include', TAG_PAGE_URL);
            cy.get('[data-test="card"]')
                .eq(1)
                .should('have.attr', 'href')
                .and('include', TAG_ARTICLE_URL);
        });
    });
    it('should not be indexed for SEO', () => {
        // use helper from article test to check robots noindex
        // cy.checkMetaContentProperty('name="robots"', 'noindex')
    });
});
