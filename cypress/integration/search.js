const DEVHUB_URL = 'https://developer.mongodb.com';
const RESULTS_PER_PAGE = 3;
const addTrailingSlash = link => `${link}/`;
const makeLinkInternal = link => link.replace(DEVHUB_URL, '');

const checkSearchResults = page => {
    cy.fixture('javaTextFilterResponse.json').then(json => {
        cy.get("[data-test='Search Result']").each(($el, i) => {
            const resultNumber = i + (page - 1) * RESULTS_PER_PAGE;
            cy.wrap($el).contains(json[resultNumber].title[0].value);
            cy.wrap($el).contains(json[resultNumber].description);
            cy.wrap($el)
                .should('have.attr', 'href')
                .should(
                    'eq',
                    addTrailingSlash(makeLinkInternal(json[resultNumber].link))
                );
        });
    });
};

describe('search', () => {
    it('should properly render a toggleable search', () => {
        // Change viewport, as here it is condensed by default
        cy.viewport(1040, 660);
        cy.visitWithoutFetch('/');
        cy.get("[data-test='Expanded Searchbar']").should('not.exist');
        cy.get("[data-test='Closed Searchbar Button']").should('exist').click();
        cy.get("[data-test='Expanded Searchbar']").should('exist');
    });
    it('should expand search by default on certain sizes', () => {
        // This will reset the viewport to default
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
        // The below line ensures we wait until the stub is done
        cy.get("[data-test='Search Result']").should('have.length', 3);
    });
    it('should show some search results', () => {
        checkSearchResults(1);
    });
    it('should paginate', () => {
        cy.get("[data-test='Search Page Text']").within(() => {
            cy.contains('1/2');
        });
        cy.get("[data-test='Back Search Page']").should(
            'have.attr',
            'aria-disabled',
            'true'
        );
        cy.get("[data-test='Forward Search Page']").click();
        cy.get("[data-test='Search Page Text']").within(() => {
            cy.contains('2/2');
        });
        checkSearchResults(2);
    });
    it('should have an empty state', () => {
        cy.mockEmptySearchResponse();
        cy.get("[data-test='Expanded Searchbar'] input").clear();
        cy.get("[data-test='Expanded Searchbar'] input").type('node');
        cy.wait('@searchEmptyArticles');
        cy.get("[data-test='Search Dropdown']").within(() => {
            cy.contains('There are no search results');
        });
    });
    it('should be mobile responsive', () => {
        cy.viewport('iphone-5');
        cy.visitWithoutFetch('/');
        cy.get("[data-test='Expanded Searchbar']").should('not.exist');
        cy.get("[data-test='Closed Searchbar Button']").should('exist').click();
        cy.get("[data-test='Expanded Searchbar']").should('exist');
        // show results
        cy.mockTextFilterResponse();
        cy.get("[data-test='Expanded Searchbar'] input").type('java');
        cy.wait('@filterJavaArticles');
        // Make sure state updates properly
        cy.get("[data-test='Expanded Searchbar'] input").should(
            'have.value',
            'java'
        );
        // The below line ensures we wait until the stub is done
        cy.get("[data-test='Search Result']").should('have.length', 6);
        checkSearchResults(1);
    });
});
