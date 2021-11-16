const ARTICLE_WITH_SERIES_URL =
    '/article/3-things-to-know-switch-from-sql-mongodb';
const PROD_ARTICLE_URL = `https://www.mongodb.com/developer${ARTICLE_WITH_SERIES_URL}`;
const ARTICLE_WITH_ATTRIBUTION_LINK_URL =
    '/article/build-newsletter-website-mongodb-data-platform/';
const EXPECTED_ATTRIBUTION_LINK =
    'https://www.mongodb.com/cloud/atlas/signup?tck%3Ddevhub-build-newsletter-website-mongodb-data-platform';
const ARTICLE_DUPLICATED_IN_STRAPI = '/how-to/hapijs-nodejs-driver';

// Article with no og description or og type (test meta description fallback)
const ARTICLE_WITH_MINIMAL_OG_URL =
    '/article/active-active-application-architectures';
const PROD_MINIMAL_ARTICLE_URL = `https://www.mongodb.com/developer${ARTICLE_WITH_MINIMAL_OG_URL}/`;
const ARTICLE_WITHOUT_OG_META_DESCRIPTION =
    'This post will begin by describing the database capabilities required by modern multi-data center applications.';
const DEFAULT_OG_TYPE = 'article';
const DEFAULT_TWITTER_SITE = '@mongodb';

const ARTICLE_TITLE = '3 Things to Know When You Switch from SQL to MongoDB';
const ARTICLE_DESCRIPTION =
    'Discover the 3 things you need to know when you switch from SQL to MongoDB';
const OG_DESCRIPTION = 'og-description text';
const SERIES_TITLE = 'SQL to MongoDB';

// Images
const ATF_IMAGE = 'sql_mdb';
const TWITTER_IMAGE =
    'https://www.mongodb.com/developer/images/social/twitter/twitter-sql-mdb.png';
const OG_IMAGE =
    'https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/og_sql_mdb_37465c8525.png';

// Social Media Links
const FACEBOOK_SHARE_URL = `https://www.facebook.com/sharer/sharer.php?u=${PROD_ARTICLE_URL}`;
const LINKEDIN_SHARE_URL = `https://www.linkedin.com/shareArticle?url=${PROD_ARTICLE_URL}/`;
const TWITTER_SHARE_URL = `https://twitter.com/intent/tweet?url=${PROD_ARTICLE_URL}&text=3%20Things%20to%20Know%20When%20You%20Switch%20from%20SQL%20to%20MongoDB`;

const UPDATED_ARTICLE_URL =
    '/article/coronavirus-map-live-data-tracker-charts/';

const TAB_ARTICLE_URL = '/article/sample-tabs-article/';

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
                // Index 0 is the copy to clipboard functionality and 1 is the
                // check box
                // TODO: UI test clipboard link copy
                const copyDOMOffset = 2;
                if (index >= copyDOMOffset) {
                    const url = SOCIAL_URLS[index - copyDOMOffset];
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
                .and('include', '/article/map-terms-concepts-sql-mongodb')
                // Want to make sure the link is not relative
                .and(
                    'not.include',
                    'article/3-things-to-know-switch-from-sql-mongodb'
                );
        });
    });

    it('should have proper SEO, open graph, and twitter tags', () => {
        // Check title eqists
        cy.title().should('eq', ARTICLE_TITLE).end();

        // Check og tags
        cy.checkMetaContentProperty('property="og:type"', 'text');
        cy.checkMetaContentProperty('property="og:title"', ARTICLE_TITLE);
        cy.checkMetaContentProperty(
            'property="og:url"',
            'http://developer-test.mongodb.com/article/3-things-to-know-switch-from-sql-mongodb'
        );
        cy.checkCanonicalUrlValue(`${PROD_ARTICLE_URL}/`);
        // An og:description exists, so we should populate the tag with it
        cy.checkMetaContentProperty(
            'property="og:description"',
            OG_DESCRIPTION
        );
        cy.checkMetaContentProperty('name="description"', ARTICLE_DESCRIPTION);
        cy.checkMetaContentProperty('property="og:image"', OG_IMAGE);

        // Check Twitter tags
        cy.checkMetaContentProperty(
            'name="twitter:creator"',
            '@Lauren_Schaefer'
        );
        cy.checkMetaContentProperty('name="twitter:card"', 'summary');
        cy.checkMetaContentProperty(
            'name="twitter:site"',
            '@test-twitter-site'
        );
        cy.checkMetaContentProperty('property="twitter:title"', ARTICLE_TITLE);
        cy.checkMetaContentProperty(
            'property="twitter:description"',
            ARTICLE_DESCRIPTION
        );
        cy.checkMetaContentProperty('name="twitter:image"', TWITTER_IMAGE);
    });

    it('should automatically populate the og description tag should it not be provided', () => {
        cy.visit(ARTICLE_WITH_MINIMAL_OG_URL).then(() => {
            cy.checkMetaContentProperty(
                'name="description"',
                ARTICLE_WITHOUT_OG_META_DESCRIPTION
            );
            // An og:description exists, so we should populate the tag with it
            cy.checkMetaContentProperty(
                'property="og:description"',
                ARTICLE_WITHOUT_OG_META_DESCRIPTION
            );
        });
    });
    it('should automatically populate the type tag should it not be provided', () => {
        cy.visit(ARTICLE_WITH_MINIMAL_OG_URL).then(() => {
            cy.checkMetaContentProperty(
                'property="og:url"',
                PROD_MINIMAL_ARTICLE_URL
            );
            cy.checkMetaContentProperty('property="og:type"', DEFAULT_OG_TYPE);
            cy.checkMetaContentProperty(
                'name="twitter:site"',
                DEFAULT_TWITTER_SITE
            );
        });
    });
    xit('should verify Cloud attribution links add the tck param as expected', () => {
        cy.visit(ARTICLE_WITH_ATTRIBUTION_LINK_URL);
        cy.get(`a[href='${EXPECTED_ATTRIBUTION_LINK}']`).should('exist');
    });
    it('should include Updated dates where applicable', () => {
        cy.visit(UPDATED_ARTICLE_URL);
        cy.contains('Updated: Apr 21, 2020');
    });
    describe('Tabs Component', () => {
        const getTabsetAtIndex = index =>
            cy.get('[data-test="Tabs"]').eq(index);
        const verifyIfTabIndexIsActive = (index, active = true) =>
            cy
                .get('button')
                .eq(index)
                .should(
                    'have.attr',
                    'aria-selected',
                    active ? 'true' : 'false'
                );
        it('should render standard tabs', () => {
            cy.visit(TAB_ARTICLE_URL);
            cy.get('[data-test="Tabs"]').should('have.length', 3);
            getTabsetAtIndex(0).within(() => {
                // Check names of tabs
                cy.contains('Bash');
                cy.contains('C++11');
                cy.contains('PHP');
                // Check content (should only be mongoexport commands)
                cy.contains('mongoexport');
                cy.contains('Some C++ code').should('not.exist');
            });
        });
        it('should render tabs with the hidden option', () => {
            getTabsetAtIndex(1).within(() => {
                // With the hidden directive, tab UI should not show
                // In this component we use display: none to hide since this is provided by LeafyGreen, so we should use not.visible since it would still appear on the DOM (and not.exist would fail)
                cy.contains('Bash').should('not.visible');
                cy.contains('C++11').should('not.visible');
                cy.contains('PHP').should('not.visible');
                // Content is updated automatically
                cy.contains('The reader selected bash');
                cy.contains('The reader selected CPP').should('not.exist');
            });
        });
        it('should change content when a tab is toggled', () => {
            getTabsetAtIndex(0).within(() => {
                // Make sure the first tab is selected and the second is not
                verifyIfTabIndexIsActive(0);
                verifyIfTabIndexIsActive(1, false);
                // Clicking this tab should update other tabs on the page with this preference
                cy.contains('C++11').should('exist').click();
                verifyIfTabIndexIsActive(0, false);
                verifyIfTabIndexIsActive(1);
                // Check content (should only be C++ now)
                cy.contains('mongoexport').should('not.exist');
                cy.contains('Some C++ code');
            });
            // Check the hidden tab and make sure content was still updated
            getTabsetAtIndex(1).within(() => {
                cy.contains('The reader selected bash').should('not.exist');
                cy.contains('The reader selected CPP');
            });
            // Check the bottom tab, it should be updated to match as well
            getTabsetAtIndex(2).within(() => {
                verifyIfTabIndexIsActive(0, false);
                verifyIfTabIndexIsActive(1);
                cy.contains('mongoexport').should('not.exist');
                cy.contains('Some C++ code');
            });
        });
    });
});
