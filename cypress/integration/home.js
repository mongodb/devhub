const CARDS = '[data-test="card"]';
const FEATURED_ARTICLES = 'header';
const PROD_SITE = 'https://developer.mongodb.com/';
const TWITCH = '[data-test="twitch"]';

describe('Home Page', () => {
    it('should properly render the home page', () => {
        cy.visit('/')
        // Check the learn button correctly links out
        cy.get(FEATURED_ARTICLES).within(() => {
            cy.contains('Learn MongoDB')
                .should('have.prop', 'href')
                .should('include', '/learn/');
        });
    });
    it('should properly render some featured articles', () => {
        cy.get(FEATURED_ARTICLES).within(() => {
            // We expect [1,4] featured articles on the home page
            cy.get(CARDS).should('have.length.of.at.least', 1);
            cy.get(CARDS).should('have.length.of.at.most', 4);
            // These cards should be links to articles
            cy.get(CARDS)
                .first()
                .should('have.prop', 'href')
                .should('not.be.empty');
            cy.get(CARDS)
                .first()
                .within(() => {
                    cy.get('img')
                        .should('have.prop', 'src')
                        .should('not.be.empty');
                    cy.get('h5').should('not.be.empty');
                });
        });
    });
    // TODO: Fix twitch API
    xit('should properly render embedded Twitch content', () => {
        // Hang onto parent reference for checking modal later
        cy.useBodyReference();
        cy.get(TWITCH).within(() => {
            cy.get(CARDS).within(() => {
                // Check the thumbnail exists
                cy.get('img').should('have.prop', 'src').should('not.be.empty');
                // Check the play button
                cy.get('button').should('exist');
                cy.get('button')
                    .first()
                    .click()
                    .then(() => {
                        cy.get('@body').within(() => {
                            cy.get('[data-test="modal"]').should('exist');
                            cy.closeModal();
                        });
                    });
            });
        });
    });
    it('should link to events', () => {
        cy.get('[data-test="events"]').within(() => {
            cy.get('a')
                .should('have.prop', 'href')
                .should('contain', '/community/events/');
        });
    });
    it('should have relevant SEO tags', () => {
        cy.checkMetaContentProperty(
            'name="description"',
            "Code, content, tutorials, programs and community to enable developers of all skill levels on the MongoDB Data Platform which includes Atlas, Realm, Compass, Data Lake and more. Whether you're coding in Java, JavaScript, C#, Python, Node, Go or looking for how this fits with IOT, AI, ML - join or follow us here."
        );
        cy.checkCanonicalUrlValue(PROD_SITE);
    });
});
