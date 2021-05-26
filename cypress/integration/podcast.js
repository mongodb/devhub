const PODCAST_SLUG = '/podcasts/this-is-the-mongodb-podcast';
const PROD_PODCAST_URL = `https://developer.mongodb.com${PODCAST_SLUG}`;

const PODCAST_TITLE = 'This is the MongoDB Podcast';
const PODCAST_DESCRIPTION =
    "Meet the team behind the MongoDB Podcast - Nic Raboy and Mike Lynn. In this\npreview, get to know your co-hosts and hear what's to come from us. \n\nWe're creating this podcast to tell developers, startups, and large\norganizations stories about what it's like working in tech, what's new and\nemerging, get you familiar with what MongoDB offers, examples of how people are\ncurrently using MongoDB, and to provide overall ideas and knowledge into the\nNoSQL and MongoDB space.\n\nIf there's a subject you'd like to see covered on the show or know a company\nthat should be featured, drop us a suggestion in the MongoDB Community Forums\n[https://community.mongodb.com/].";
// Images
const IMAGE =
    'https://ssl-static.libsyn.com/p/assets/3/2/d/b/32dbb642e0f5c977/MDB_Podcast_Cover_Art_V2.png';
// Social Media Links
const FACEBOOK_SHARE_URL = `https://www.facebook.com/sharer/sharer.php?u=${PROD_PODCAST_URL}`;
const LINKEDIN_SHARE_URL = `https://www.linkedin.com/shareArticle?url=${PROD_PODCAST_URL}/`;
const TWITTER_SHARE_URL = `https://twitter.com/intent/tweet?url=${PROD_PODCAST_URL}&text=This%20is%20the%20MongoDB%20Podcast`;

const SOCIAL_URLS = [LINKEDIN_SHARE_URL, TWITTER_SHARE_URL, FACEBOOK_SHARE_URL];

const BREADCRUMBS = ['Home', 'Learn', 'Podcast'];

describe('Sample Podcast Page', () => {
    it('should have a descriptive header', () => {
        cy.visit(PODCAST_SLUG).then(() => {
            cy.get('header').within(() => {
                cy.get('h1').contains(PODCAST_TITLE);
                // Check pubdate
                cy.contains(/Published: Feb 25, 2020|Published: 25 Feb 2020/);
            });
        });
    });

    it('should have description', () => {
        cy.get('article p').invoke('text')
            .should('contain', PODCAST_DESCRIPTION)
    })

    it('should have links to share content on social media', () => {
        cy.get('[data-test="article-share-links"]').within(() => {
            cy.get('a').each((link, index) => {
                //Omitted first icon and test will be changed after new links logic.
                if (index !== 0) {
                    const url = SOCIAL_URLS[index - 1];
                    cy.wrap(link).should('have.prop', 'href', url);
                }
            });
        });
    });

    it('should have background image', () => {
        cy.get('header > div')
            .should('have.css', 'background-image')
            .and('match', new RegExp(IMAGE));
    });

    it('should have proper SEO, open graph, and twitter tags', () => {
        // Check title exists
        cy.title().should('eq', PODCAST_TITLE).end();

        // Check og tags
        cy.checkMetaContentProperty('property="og:type"', 'article');
        cy.checkMetaContentProperty('property="og:title"', PODCAST_TITLE);
        cy.checkMetaContentProperty(
            'property="og:url"',
            `${PROD_PODCAST_URL}/`
        );
        cy.checkCanonicalUrlValue(`${PROD_PODCAST_URL}/`);
        // An og:description exists, so we should populate the tag with it
        cy.checkMetaContentProperty(
            'property="og:description"',
            PODCAST_DESCRIPTION
        );
        cy.checkMetaContentProperty('name="description"', PODCAST_DESCRIPTION);
        cy.checkMetaContentProperty('property="og:image"', IMAGE);

        // Check Twitter tags
        cy.checkMetaContentProperty('name="twitter:card"', 'summary');
        cy.checkMetaContentProperty('name="twitter:site"', '@mongodb');
        cy.checkMetaContentProperty('property="twitter:title"', PODCAST_TITLE);
        cy.checkMetaContentProperty(
            'property="twitter:description"',
            PODCAST_DESCRIPTION
        );
        cy.checkMetaContentProperty('name="twitter:image"', IMAGE);
    });

    it('should have breadcrumb', () => {
        cy.get('header a').each((el, index) => {
            cy.wrap(el).contains(BREADCRUMBS[index]);
        });
    });

    describe('Audio Player', () => {

        before(() => {
            // Needs for finish player's loading.
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(2000);
        })

        it('should exist', () => {
            cy.get('[data-test="audio-player"]').should('exist');
        });

        it('should have podcasts links', () => {
            cy.get('[data-test="player-links"]').within(() => {
                cy.get('a').each(el => {
                    cy.wrap(el)
                        .should('exist')
                        .and('have.attr', 'target', '_blank')
                        .and('have.attr', 'href');
                });
            });
        });

        it('should fast forward and rewind audio player', () => {
            cy.get('[data-test="audio-player"]').within(() => {
                cy.get('[aria-label="fast-forward"]').click();
                cy.contains('00:30');
                cy.get('[aria-label="rewind"]').click();
                cy.contains('00:00');
            });
        });

        it('should play audio player', () => {
            cy.get('[data-test="audio-player"]').within(() => {
                cy.get('[aria-label="pause"]').should('not.exist');
                cy.get('[aria-label="play"]').click();
                cy.get('[aria-label="pause"]').should('exist');
            });
        });
    })
});
