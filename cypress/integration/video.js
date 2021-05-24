const VIDEO_SLUG = '/videos/youtube/ep-14-the-citizen-developer';
const PROD_VIDEO_URL = `https://developer.mongodb.com${VIDEO_SLUG}`;

const VIDEO_TITLE = 'Ep. 14 The Citizen Developer';
const VIDEO_DESCRIPTION =
    "In today's episode, we explore the journey someone who is not a full-time developer takes when they approach a problem equipped with the MongoDB platform as a solution. We're joined by Dominic Wellington, Director of Market Intelligence.";
// Images
const IMAGE = 'https://i.ytimg.com/vi/mqJJkeJJWnY/sddefault.jpg';
// Social Media Links
const FACEBOOK_SHARE_URL = `https://www.facebook.com/sharer/sharer.php?u=${PROD_VIDEO_URL}`;
const LINKEDIN_SHARE_URL = `https://www.linkedin.com/shareArticle?url=${PROD_VIDEO_URL}/`;
const TWITTER_SHARE_URL = `https://twitter.com/intent/tweet?url=${PROD_VIDEO_URL}&text=Ep.%2014%20The%20Citizen%20Developer`;

const SOCIAL_URLS = [LINKEDIN_SHARE_URL, TWITTER_SHARE_URL, FACEBOOK_SHARE_URL];

const BREADCRUMBS = ['Home', 'Learn', 'youtube Video'];

const VIDEO_IFRAME = '#widget2';
const PLAYER_PREVIEW = '.react-player__preview';

describe('Sample Video Page', () => {
    it('should have a descriptive header', () => {
        cy.visit(VIDEO_SLUG).then(() => {
            cy.get('header').within(() => {
                cy.get('h1').contains(VIDEO_TITLE);
                // Check pubdate
                cy.contains(/Published: Jul 30, 2020|Published: 30 Jul 2020/);
            });
        });
    });

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

    it('should have description', () => {
        cy.get('article p').invoke('text').should('contain', VIDEO_DESCRIPTION);
    });

    it('should have breadcrumb', () => {
        cy.get('header a').each((el, index) => {
            cy.wrap(el).contains(BREADCRUMBS[index]);
        });
    });

    it('should have proper SEO, open graph, and twitter tags', () => {
        // Check title exists
        cy.title().should('eq', VIDEO_TITLE).end();

        // Check og tags
        cy.checkMetaContentProperty('property="og:type"', 'article');
        cy.checkMetaContentProperty('property="og:title"', VIDEO_TITLE);
        cy.checkMetaContentProperty('property="og:url"', `${PROD_VIDEO_URL}/`);
        cy.checkCanonicalUrlValue(`${PROD_VIDEO_URL}/`);
        // An og:description exists, so we should populate the tag with it
        cy.checkMetaContentProperty(
            'property="og:description"',
            VIDEO_DESCRIPTION
        );
        cy.checkMetaContentProperty('name="description"', VIDEO_DESCRIPTION);
        cy.checkMetaContentProperty('property="og:image"', IMAGE);

        // Check Twitter tags
        cy.checkMetaContentProperty('name="twitter:card"', 'summary');
        cy.checkMetaContentProperty('name="twitter:site"', '@mongodb');
        cy.checkMetaContentProperty('property="twitter:title"', VIDEO_TITLE);
        cy.checkMetaContentProperty(
            'property="twitter:description"',
            VIDEO_DESCRIPTION
        );
        cy.checkMetaContentProperty('name="twitter:image"', IMAGE);
    });

    describe('Video Player', () => {
        it('should have video with image', () => {
            cy.get(PLAYER_PREVIEW)
                .should('have.css', 'background-image')
                .and('match', new RegExp(IMAGE));
        });

        it('should play video', () => {
            cy.get(VIDEO_IFRAME).should('not.exist');
            cy.get(PLAYER_PREVIEW).within(() => {
                cy.get('button').click();
            });
            cy.get(VIDEO_IFRAME).should('exist');
        });

        it('video has title', () => {
            cy.get(VIDEO_IFRAME)
                .should('exist')
                .and('have.attr', 'title', 'YouTube video player');
        });
    });
});
