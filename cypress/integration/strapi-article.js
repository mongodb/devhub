const STRAPI_SERIES_TITLE = 'Strapi Series';
const STRAPI_ARTICLE = '/how-to/hapijs-nodejs-driver/';
const PROD_STRAPI_ARTICLE_URL = `https://www.mongodb.com/developer${STRAPI_ARTICLE}`;
const SERIES_SECOND_ARTICLE = '/how-to/hapijs-nodejs-driver/';

describe('Sample Strapi Article', () => {
    it('should have a default canonical URL', () => {
        cy.visit(STRAPI_ARTICLE).then(() => {
            cy.contains('Strapi HapiJS Article');
            cy.checkCanonicalUrlValue(`${PROD_STRAPI_ARTICLE_URL}`);
        });
    });

    it('should support a series of articles', () => {
        // Check series title
        cy.get('[data-test="series"]').within(() => {
            cy.contains(STRAPI_SERIES_TITLE);
            cy.get('a').should('have.length', 3);
            // Check other one goes to article
            cy.get('a')
                .first()
                .should('have.prop', 'href')
                .and('include', STRAPI_ARTICLE);
            cy.get('a')
                .eq(1)
                .should('have.prop', 'href')
                .and('include', SERIES_SECOND_ARTICLE);
        });
    });
});
