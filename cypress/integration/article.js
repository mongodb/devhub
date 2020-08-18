const ARTICLE_WITH_SERIES_URL =
    '/article/3-things-to-know-switch-from-sql-mongodb';
const PROD_ARTICLE_URL = `https://developer.mongodb.com${ARTICLE_WITH_SERIES_URL}`;

const ARTICLE_TITLE = '3 Things to Know When You Switch from SQL to MongoDB';
const ARTICLE_DESCRIPTION =
    'Discover the 3 things you need to know when you switch from SQL to MongoDB';
const SERIES_TITLE = 'SQL to MongoDB';

// Images
const ATF_IMAGE = '/images/atf-images/illustrations/sql-mdb.png';
const TWITTER_IMAGE =
    'https://developer.mongodb.com/images/social/twitter/twitter-sql-mdb.png';
const OG_IMAGE =
    'https://developer.mongodb.com/images/social/open-graph/og-sql-mdb.png';

// Social Media Links
const FACEBOOK_SHARE_URL = `https://www.facebook.com/sharer/sharer.php?u=${PROD_ARTICLE_URL}`;
const LINKEDIN_SHARE_URL = `https://www.linkedin.com/shareArticle?url=${PROD_ARTICLE_URL}`;
const OG_URL =
    'http://developer.mongodb.com/article/3-things-to-know-switch-from-sql-mongodb';
const TWITTER_SHARE_URL = `https://twitter.com/intent/tweet?url=${PROD_ARTICLE_URL}&text=3%20Things%20to%20Know%20When%20You%20Switch%20from%20SQL%20to%20MongoDB`;

const SOCIAL_URLS = [LINKEDIN_SHARE_URL, TWITTER_SHARE_URL, FACEBOOK_SHARE_URL];

describe('Sample Article Page', () => {
    it('should have a descriptive header', () => {
        cy.visit(ARTICLE_WITH_SERIES_URL).then(() => {
            cy.get('header').within(() => {
                // Check title
                cy.contains(ARTICLE_TITLE);
                // Check pubdate
                cy.contains('Published: Apr 01, 2020');
                // Check tags
                cy.checkTagListProperties();
                // Check author
                cy.contains('Lauren Schaefer')
                    .should('have.prop', 'href')
                    .and('include', '/author/lauren-schaefer');
                // Check ATF
                cy.get('div')
                    .should('have.css', 'background-image')
                    .and('include', ATF_IMAGE);
            });
        });
    });

    it('should have links to share content on social media', () => {
        cy.get('[data-test="article-share-links"]').within(() => {
            cy.get('a').each((link, index) => {
                // Index 0 is the copy to clipboard functionality
                // TODO: UI test clipboard link copy
                if (index !== 0) {
                    const url = SOCIAL_URLS[index - 1];
                    cy.wrap(link).should('have.prop', 'href', url);
                }
            });
        });
    });

    it('should have links to sub-headings in the article', () => {
        cy.get('h2')
            .its('length')
            .then(numSubheadings => {
                // Contents list should be triggered by a tooltip click
                cy.get('[data-test="contents-list"]').should('not.exist');
                cy.get('[data-test="contents-tooltip"]').click();
                cy.get('[data-test="contents-list"]').within(() => {
                    cy.get('a').should('have.length', numSubheadings);
                    // Need to force because this lies within a tooltip
                    cy.contains('Embrace Document Diversity').click({
                        force: true,
                    });
                    cy.url().should('include', '#embrace-document-diversity');
                });
            });
    });

    it('should be a part of an article series', () => {
        // Check series title
        cy.get('[data-test="series"]').within(() => {
            cy.contains(SERIES_TITLE);
            cy.get('a').should('have.length', 3);
            // Check other one goes to article
            cy.get('a')
                .first()
                .should('have.prop', 'href')
                .and('include', '/article/map-terms-concepts-sql-mongodb');
        });
    });

    it('should have proper SEO, open graph, and twitter tags', () => {
        // Check title eqists
        cy.title().should('eq', ARTICLE_TITLE).end();

        // Check og tags
        cy.checkMetaContentProperty('property="og:type"', 'article');
        cy.checkMetaContentProperty('property="og:title"', ARTICLE_TITLE);
        cy.checkMetaContentProperty(
            'property="og:url"',
            // This would match the PROD_ARTICLE_URL but it has http and not https
            OG_URL
        );
        cy.checkMetaContentProperty(
            'property="og:description"',
            ARTICLE_DESCRIPTION
        );
        cy.checkMetaContentProperty('property="og:image"', OG_IMAGE);

        // Check Twitter tags
        cy.checkMetaContentProperty(
            'name="twitter:creator"',
            '@Lauren_Schaefer'
        );
        cy.checkMetaContentProperty('name="twitter:card"', 'summary');
        cy.checkMetaContentProperty('name="twitter:site"', '@mongodb');
        cy.checkMetaContentProperty('property="twitter:title"', ARTICLE_TITLE);
        cy.checkMetaContentProperty(
            'property="twitter:description"',
            ARTICLE_DESCRIPTION
        );
        cy.checkMetaContentProperty('name="twitter:image"', TWITTER_IMAGE);
    });
});
