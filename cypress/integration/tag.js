const TAG_ARTICLE_URL =
    '/article/johns-hopkins-university-covid-19-data-atlas/';
const FIRST_TAG_ARTICLE = '/article/3-things-to-know-switch-from-sql-mongodb/';
const TAG_PAGE_URL = '/product/mongodb/';
const PROD_TAG_PAGE_URL = `https://www.mongodb.com/developer${TAG_PAGE_URL}`;
const TITLE = 'MongoDB';

describe('Tag page', () => {
    it('should have a header with some basic tag information', () => {
        cy.visit(TAG_PAGE_URL);
        cy.get('header').within(() => {
            cy.contains(TITLE);
            // Check the breadcrumb is being populated correctly
            cy.get('div').within(() => {
                cy.get('a').last().contains(TITLE);
                cy.get('a')
                    .last()
                    .should('have.attr', 'href')
                    .and('include', TAG_PAGE_URL);
            });
        });
        cy.get('h1').should('have.length', 1);
    });
    it('should contain several articles with basic information', () => {
        cy.get('[data-test="card"]').should('have.length', 12);
        cy.get('[data-test="card"]')
            .first()
            .then(card => {
                cy.checkArticleCard(card);
            });
    });
    xit('should contain an article tagged with this tag', () => {
        cy.visit(TAG_ARTICLE_URL);
        // Get SQL tag and check this article appears on the tag page
        cy.get('header').within(() => {
            cy.get('ul li a').first().contains(TITLE);
            cy.get('ul li a').first().click();
        });
        // Wait for an element to render on the tag page before checking URL
        cy.contains('Tagged In');
        cy.url().should('include', TAG_PAGE_URL);
        cy.get('[data-test="card"]')
            .eq(0)
            .should('have.attr', 'href')
            .and('include', FIRST_TAG_ARTICLE);
    });
    xit('should expand the blog tag list when requested', () => {
        cy.get('[data-test="card"]')
            .eq(2)
            .within(() => {
                cy.checkTagListProperties(true);
            });
    });
    it('should not be indexed for SEO', () => {
        cy.checkMetaContentProperty('name="robots"', 'noindex');
    });
    it('should have a proper canonical URL', () => {
        cy.checkCanonicalUrlValue(`${PROD_TAG_PAGE_URL}`);
    });

    it('should have a header with some basic tag information', () => {
        cy.visit(TAG_PAGE_URL);
    });

    it('should have title with page number and uniq h1 tag', () => {
        cy.visit(TAG_PAGE_URL + '?page=2');
        cy.title().should('eq', `${TITLE} - Page 2 - MongoDB Developer Hub`);
        cy.get('h1').should('have.length', 1).contains(`${TITLE} - Page 2`);
    });
});
