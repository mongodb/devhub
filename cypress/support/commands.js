Cypress.Commands.add('closeModal', () => {
    cy.get('[data-test="modal-close"]').click();
});

// Keep a reference to the body dom element to reference later even in "within" blocks
Cypress.Commands.add('useBodyReference', () => {
    cy.get('body').as('body');
});

// Mock data from events servers
Cypress.Commands.add('mockEventsApi', () => {
    cy.fixture('liveEventData.json').as('liveEventData');
    cy.fixture('eventData.json').as('eventData');
    cy.server();
    cy.route(
        '**/api/event/all/1?sort=-node_type_attributes.event_start',
        '@eventData'
    ).as('getEvents');
    cy.route('**/api/event?status=Live', '@liveEventData').as('getLiveEvents');
});

// To stub requests with Cypress, we must remove fetch from the browser so
// we can fallback to XMLHttpRequests
// https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/stubbing-spying__window-fetch#readme

Cypress.Commands.add('visitWithoutFetch', path => {
    cy.readFile('node_modules/whatwg-fetch/dist/fetch.umd.js').then(
        polyfill => {
            cy.visit(path, {
                onBeforeLoad(win) {
                    delete win.fetch;
                    win.eval(polyfill);
                },
            });
        }
    );
});
