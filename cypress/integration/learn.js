const CANONICAL_URL = 'https://www.mongodb.com/developer/learn/';
const FIRST_ARTICLE_IN_ORDERING =
    '/article/3-things-to-know-switch-from-sql-mongodb/';
const FIRST_ARTICLE_UPDATED_DATE = 'Feb 09, 2022';
const FIRST_ARTICLE_PUBLISHED_DATE = 'Dec 01, 2021';
const SECOND_ARTICLE_TITLE = 'Active-Active';

describe('Learn Page', () => {
    it('should properly render the learn page', () => {
        cy.visitWithoutFetch('/learn/');
        // Make sure something renders on the page
        cy.contains('Make better, faster applications');
        cy.title().should('eq', 'Learn - MongoDB Developer Hub');
    });
    it('should have a proper canonical url', () => {
        cy.checkCanonicalUrlValue(CANONICAL_URL);
    });
    it('should have a uniq h1 tag', () => {
        cy.get('h1').should('have.length', 1);
    });
    it('should properly render some featured articles', () => {
        // Check main featured article
        cy.get('[data-test="primary-featured-article"]')
            .should('have.length', 1)
            .within(card => {
                cy.checkArticleCard(card);
            });
        cy.get('[data-test="secondary-featured-article"]')
            .should('have.length', 2)
            .each(
                // Should only include title, description, tags, link
                cy.checkSecondaryFeaturedArticleCard
            );
    });
    it('should sort using the updated date where appropriate', () => {
        cy.toggleLearnPageTab('Articles');
        cy.get('[data-test="card-list"]').within(() => {
            cy.get('[data-test="card"]')
                .eq(0)
                .should('contain', '3 Things to Know')
                .click({ force: true, scrollBehavior: false });
        });
        cy.url().should('include', FIRST_ARTICLE_IN_ORDERING);
        // By targeting the hero banner we can be sure the navigation is done
        cy.get('[data-test="hero-banner"]').within(() => {
            cy.contains(`Updated: ${FIRST_ARTICLE_UPDATED_DATE}`);
            cy.contains(`Published: ${FIRST_ARTICLE_PUBLISHED_DATE}`);
        });
        cy.visitWithoutFetch('/learn/');
    });
    it(
        'should filter content based on the selected tab',
        {
            retries: {
                runMode: 3,
                openMode: 3,
            },
        },
        () => {
            // TODO: Check content in "All" (Stub videos and podcasts)
            // Check content in "Articles"
            cy.toggleLearnPageTab('Articles');
            cy.get('[data-test="card-list"]').within(() => {
                cy.get('[data-test="card"]')
                    .eq(1)
                    .within(card => {
                        cy.checkArticleCard(card);
                        cy.contains(SECOND_ARTICLE_TITLE);
                    });
            });
            // TODO also check content in Podcasts and Videos
        }
    );

    it(
        'should only show the filter bar for all tabs',
        {
            retries: {
                runMode: 2,
                openMode: 2,
            },
        },
        () => {
            cy.toggleLearnPageTab('All');
            cy.get('[data-test="filter-bar"]').should('exist');
            cy.toggleLearnPageTab('Articles');
            cy.get('[data-test="filter-bar"]').should('exist');
            cy.toggleLearnPageTab('Podcasts');
            cy.get('[data-test="filter-bar"]').should('exist');
            cy.toggleLearnPageTab('Videos');
            cy.get('[data-test="filter-bar"]').should('exist');
        }
    );
    it('should filter content using the filter dropdowns', () => {
        cy.toggleLearnPageTab('Articles');
        cy.checkCardInCardList('3 Things to Know', 0);
        cy.getUnderStickyNav('[data-test="filter-bar"]').within(() => {
            cy.get('[role="listbox"]').first().click();
        });
        // Update filter
        // Using click() for some reason loses focus before the onClick fires
        // Using trigger seems to work, but this should be looked into a bit more
        cy.contains('Atlas (26)').trigger('click');
        // The url should contain the filter value as a param
        cy.url().should('include', 'products=Atlas');
        // Check content
        cy.checkCardInCardList('How to work with Johns Hopkins');
    });
    it('should have a list of item cards', () => {
        cy.get('[data-test="card-list"]').within(() => {
            cy.get('[data-test="card"]').should('have.length', 12);
        });
    });
    it('should have updated fields after "Load More" is activated', () => {
        cy.contains('Load more').should('exist').click();
        cy.url().should('include', 'page=2');
        cy.title().should('eq', 'Learn - Page 2 - MongoDB Developer Hub');
        cy.get('[data-test="card-list"]').within(() => {
            cy.get('[data-test="card"]').should('have.length', 24);
        });
    });
    it('should filter content using the text filter', () => {
        // Check empty state
        cy.mockTextFilterResponse();
        cy.get('[data-test="filter-bar"]').within(() => {
            cy.get('input').type('java');
        });
        cy.wait('@filterJavaArticles');
        // Verify query params update as expected
        cy.url().should('include', 'text=java');
        cy.get('[data-test="filter-bar"]').within(() => {
            cy.get('input').clear();
        });
        cy.url().should('not.include', 'text=java');
    });
    // TODO: Stub podcasts and videos
    xit('should play a podcast', () => {
        // Find podcast
        // Click
        // Check footer w/ times
    });
});
