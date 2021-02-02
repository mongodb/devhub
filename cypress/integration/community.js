describe('Community Page', () => {
    it('should have some events', () => {
        cy.mockEventsApi();
        cy.visitWithoutFetch('/community/');
        cy.wait(['@getEvents', '@getLiveEvents']);
        cy.get('[data-test="event"]').should('have.length', 2);
    });
    it('should correctly render events from the live.mongodb.com API', () => {
        cy.get('[data-test="event"]')
            .first()
            .should('have.attr', 'href')
            .should('contain', 'mongodblive-watch-party');
        cy.get('[data-test="event"]')
            .first()
            .within(() => {
                // Check basic event information still renders
                cy.contains('MongoDB.live Watch Party');
                cy.contains('Philadelphia');
                cy.contains('US');
            });
    });
    it('should correctly render events from the www.mongodb.com API', () => {
        cy.get('[data-test="event"]')
            .last()
            .should('have.attr', 'href')
            .should('contain', 'mongodblocal-london-2020');
        cy.get('[data-test="event"]')
            .last()
            .within(() => {
                // Check basic event information still renders
                cy.contains('MongoDB.local London');
                cy.contains('London');
                cy.contains('United Kingdom');
            });
    });
    it('should have a link to all of the events', () => {
        cy.contains('See all events')
            .should('have.attr', 'href')
            .should('contain', '/community/events');
    });
});
