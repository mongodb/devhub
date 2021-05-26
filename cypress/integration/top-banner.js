const TOP_BANNER = "[data-test='top-banner']";
const TEST_DESKTOP_SRC =
    'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/dot_live_banner_desktop_216ff89791.png';
const TEST_MOBILE_SRC =
    'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/dot_live_banner_mobile_bed7287154.png';
const TEST_LINK = 'https://developer.mongodb.com/';

describe('Top Banner', () => {
    it('should properly render the top banner', () => {
        cy.visit('/');
        cy.get(TOP_BANNER).should('have.prop', 'href').and('eq', TEST_LINK);
        cy.get(TOP_BANNER).within(() => {
            cy.get('img')
                .should('have.prop', 'src')
                .and('eq', TEST_DESKTOP_SRC);
        });
    });
    it('should be mobile responsive', () => {
        cy.viewport('iphone-5');
        cy.get(TOP_BANNER).should('have.prop', 'href').and('eq', TEST_LINK);
        cy.get(TOP_BANNER).within(() => {
            cy.get('img').should('have.prop', 'src').and('eq', TEST_MOBILE_SRC);
        });
        cy.viewport(1280, 660);
    });
});
