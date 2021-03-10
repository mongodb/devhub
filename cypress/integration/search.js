const DEVHUB_URL = 'https://developer.mongodb.com';
const addTrailingSlash = link => `${link}/`;
const makeLinkInternal = link => link.replace(DEVHUB_URL, '');

describe('search', () => {
    it('should properly render a toggleable search', () => {
        cy.visitWithoutFetch('/');
        cy.get("[data-test='Expanded Searchbar']").should('not.exist');
        cy.get("[data-test='Closed Searchbar Button']").should('exist').click();
        cy.get("[data-test='Expanded Searchbar']").should('exist');
    });
    it('should accept a search query', () => {
        cy.mockTextFilterResponse();
        cy.get("[data-test='Expanded Searchbar'] input").type('java');
        cy.wait('@filterJavaArticles');
        // Make sure state updates properly
        cy.get("[data-test='Expanded Searchbar'] input").should(
            'have.value',
            'java'
        );
    });
    it('should show some search results', () => {
        cy.fixture('javaTextFilterResponse.json').then(json => {
            cy.get("[data-test='Search Result']").each(($el, i) => {
                cy.wrap($el).contains(json[i].title[0].value);
                cy.wrap($el).contains(json[i].description);
                cy.wrap($el)
                    .should('have.attr', 'href')
                    .should(
                        'eq',
                        addTrailingSlash(makeLinkInternal(json[i].link))
                    );
            });
        });
    });
    xit('should paginate');
    xit('should have an empty state');
    xit('should be mobile responsive', () => {
        // closed/open
        // show results
    });
});
