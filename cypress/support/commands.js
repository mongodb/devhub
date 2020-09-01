Cypress.Commands.add('closeModal', () => {
    cy.get('[data-test="modal-close"]').click();
});

// Keep a reference to the body dom element to reference later even in "within" blocks
Cypress.Commands.add('useBodyReference', () => {
    cy.get('body').as('body');
});

Cypress.Commands.add('checkTagListProperties', () => {
    cy.get('ul li a')
        .first()
        .should('have.attr', 'href')
        .should('match', /\/(tag|product|language)/);
});

// Basic sanity checks for an article card (image, title, tags, etc)
Cypress.Commands.add('checkArticleCard', card => {
    cy.get(card).within(() => {
        // Title
        cy.get('h5').should('not.be.empty');
        // Description
        cy.get('p').should('not.be.empty');
        cy.get('img').should('have.attr', 'src').should('not.be.empty');
        // Tags
        cy.checkTagListProperties();
    });
});

Cypress.Commands.add('checkMetaContentProperty', (query, value) => {
    cy.get(`head meta[${query}]`).should('have.prop', 'content', value);
});

Cypress.Commands.add('checkScriptExists', query => {
    cy.get(`body script[${query}]`).should('exist');
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
