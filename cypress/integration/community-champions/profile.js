const ACCOLADES = [
    { alt: 'DBA Associate badge', url: 'https://dbacertification.com' },
    { alt: 'Developer Associate badge', url: 'https://devcertification.com' },
    {
        alt: 'Awesome Award',
        url: 'https://www.mongodb.com/blog/post/congratulations-2021-innovation-award-winners',
    },
];
const CERTIFIED_CHAMPION_LINK = '/community-champions/certified-champion/';
const CERTIFIED_CHAMPION_LOCATION = 'Location';
const CERTIFIED_CHAMPION_NAME = 'Certified Community Champion';
const CERTIFIED_CHAMPION_TITLE = 'Title';
const CERTIFIED_CHAMPION_QUOTE = 'I have some certifications';
const CERTIFIED_CHAMPION_BIO = 'I am a certified community champion!';
const SOCIALS = [
    'LinkedIn',
    'GitHub',
    'Twitch',
    'YouTube',
    'Facebook',
    'Twitter',
];
const UNCERTIFIED_CHAMPION_LINK = '/community-champions/uncertified-champion/';

describe('Community Champions Entry Page', () => {
    it('should render a page for a champion with all data', () => {
        cy.visit(CERTIFIED_CHAMPION_LINK).then(() => {
            cy.contains(CERTIFIED_CHAMPION_BIO);
            cy.contains(CERTIFIED_CHAMPION_LOCATION);
            cy.contains(CERTIFIED_CHAMPION_NAME);
            cy.contains(CERTIFIED_CHAMPION_QUOTE);
            cy.contains(CERTIFIED_CHAMPION_TITLE);
            cy.get('[data-test="blogs-publications"]').within(() => {
                cy.get('a')
                    .contains('Sample Publication')
                    .should('have.attr', 'href')
                    .and('equal', 'http://publication.com');
            });
            cy.get('[data-test="social-links"]').within(() => {
                cy.get('a').should('have.length', SOCIALS.length);
                cy.get('a').each(($el, i) => {
                    cy.wrap($el).contains(SOCIALS[i]);
                    cy.wrap($el)
                        .should('have.attr', 'href')
                        .and('eq', `http://${SOCIALS[i].toLowerCase()}.com`);
                });
            });
            cy.get('[data-test="accolades"]').within(() => {
                cy.get('[data-test="accolade"]').should('have.length', 3);
                cy.get('[data-test="accolade"]').each(($el, i) => {
                    cy.wrap($el).within(() => {
                        cy.get('img').should(
                            'have.attr',
                            'alt',
                            ACCOLADES[i].alt
                        );
                    });
                });
            });
        });
    });

    it('should render a page for a champion with minimal data', () => {
        cy.visit(UNCERTIFIED_CHAMPION_LINK).then(() => {
            cy.get('[data-test="blogs-publications"]').should('not.exist');
            cy.get('[data-test="social-links"]').should('not.exist');
            cy.get('[data-test="accolades"]').should('not.exist');
        });
    });
});
