describe('Learn Page', () => {
    it('should properly render the learn page', () => {
        cy.visit('/learn');
        // Make sure something renders on the page
        cy.contains('Make better, faster applications');
    });
    it('should properly render some featured articles', () => {
        // Check main featured article
        // Should include title, description, tags, image, link
        // Check secondary featured articles
        // Should include title, description, tags, link
    });
    it('should filter content based on the selected tab', () => {
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
