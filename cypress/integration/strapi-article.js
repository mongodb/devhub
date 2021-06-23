const STRAPI_ARTICLE = '/how-to/hapijs-nodejs-driver/';
const PROD_STRAPI_ARTICLE_URL = `https://developer.mongodb.com${STRAPI_ARTICLE}`;

describe('Sample Strapi Article', () => {
    it('should have a default canonical URL', () => {
        cy.visit(STRAPI_ARTICLE).then(() => {
            cy.contains('Strapi HapiJS Article');
            cy.checkCanonicalUrlValue(`${PROD_STRAPI_ARTICLE_URL}`);
        });
    });
});
