describe('Learn Page', () => {
    it('should properly render the learn page', () => {
        cy.visit('/learn');
        // Make sure something renders on the page
        cy.contains('Make better, faster applications');
    });
    it('should properly render some featured articles', () => {
        // Check main featured article
        cy.get('[data-test="featured-articles"]').within(c => {
            cy.get('[data-test="primary-featured-article"]').within(c =>
                cy.checkArticleCard(c)
            );
            // Should include title, description, tags, image, link
            // cy.checkArticleCard(c);
        });
        // Check secondary featured articles
        cy.get('SecondaryFeaturedArticle').each(c =>
            cy.checkSecondaryFeaturedArticleCard(c)
        );
    });
    it('should filter content based on the selected tab', () => {
        cy.get('[data-test="tabs"]').within(() => {
            cy.contains('Articles').click();
        });
        // Check content in "All"
        // Check content in "Articles"
        // Check content in "Videos"
        // Check content in "Podcasts"
    });
    it('should filter content using the filter dropdowns', () => {
        // Check filters only show in "All" or "Articles"
        // Update filter
        // Check content
    });
    it('should filter content using the text filter', () => {
        // Stub stitch
        // type something
        // Check response article matches with appropriate fields
        // Check empty state
    });
    it('should play a podcast', () => {
        // Find podcast
        // Click
        // Check footer w/ times
    });
});
