describe('Learn Page', () => {
    it('should properly render the learn page', () => {
        cy.visitWithoutFetch('/learn');
        // Make sure something renders on the page
        cy.contains('Make better, faster applications');
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
    it('should filter content based on the selected tab', () => {
        // TODO: Check content in "All" (Stub videos and podcasts)
        // Check content in "Articles"
        cy.toggleLearnPageTab('Articles');
        cy.get('[data-test="card-list"]').within(() => {
            cy.get('[data-test="card"]')
                .first()
                .within(card => {
                    cy.checkArticleCard(card);
                    cy.contains('Build a Newsletter Website');
                });
        });
        // TODO Check content in "Videos" (Stub videos and podcasts)
        cy.toggleLearnPageTab('Videos');
        // TODO Check content in "Podcasts" (Stub videos and podcasts)
        cy.toggleLearnPageTab('Podcasts');
    });
    it('should only show the filter bar for "All" or "Articles"', () => {
        cy.toggleLearnPageTab('All');
        cy.get('[data-test="filter-bar"]').should('exist');
        cy.toggleLearnPageTab('Articles');
        cy.get('[data-test="filter-bar"]').should('exist');
        cy.toggleLearnPageTab('Podcasts');
        cy.get('[data-test="filter-bar"]').should('not.exist');
        cy.toggleLearnPageTab('Videos');
        cy.get('[data-test="filter-bar"]').should('not.exist');
    });
    it('should filter content using the filter dropdowns', () => {
        cy.toggleLearnPageTab('Articles');
        cy.checkFirstCardInCardList('Build a Newsletter Website');
        cy.get('[data-test="filter-bar"]').within(() => {
            cy.get('[role="listbox"]').first().click();
        });
        // Update filter
        // Using click() for some reason loses focus before the onClick fires
        // Using trigger seems to work, but this should be looked into a bit more
        cy.contains('Atlas (26)').trigger('click');
        // The url should contain the filter value as a param
        cy.url().should('include', '?products=Atlas');
        // Check content
        cy.checkFirstCardInCardList('How to work with Johns Hopkins');
    });
    it('should filter content using the text filter', () => {
        // Check empty state
        cy.mockTextFilterResponse();
        cy.get('[data-test="filter-bar"]').within(() => {
            cy.get('input').type('java');
        });
        cy.wait('@filterJavaArticles');
    });
    // TODO: Stub podcasts and videos
    xit('should play a podcast', () => {
        // Find podcast
        // Click
        // Check footer w/ times
    });
});
