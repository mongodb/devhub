const BACK_PAGE_BUTTON = "[data-test='Back Search Page']";
const FORWARD_PAGE_BUTTON = "[data-test='Forward Search Page']";
const SEARCHBAR = "[data-test='Expanded Searchbar']";
const SEARCH_DROPDOWN = "[data-test='Search Dropdown']";
const SEARCH_INPUT = "[data-test='Expanded Searchbar'] input";
const SEARCH_PAGINATION_TEXT = "[data-test='Search Page Text']";
const SEARCH_RESULT = "[data-test='Search Result']";

const DEVHUB_URL = 'https://developer.mongodb.com';
const RESULTS_PER_PAGE = 3;
const addTrailingSlash = link => `${link}/`;
const makeLinkInternal = link => link.replace(DEVHUB_URL, '');

const checkSearchResults = page => {
    cy.fixture('javaTextFilterResponse.json').then(json => {
        cy.get(SEARCH_RESULT).each(($el, i) => {
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

const checkCondensedSearchbar = () => {
    cy.get(SEARCHBAR).should('not.exist');
    cy.get("[data-test='Closed Searchbar Button']").should('exist').click();
    cy.get(SEARCHBAR).should('exist');
};

const mockJavaSearch = () => {
    cy.mockTextFilterResponse();
    cy.get(SEARCH_INPUT).type('java');
    cy.wait('@filterJavaArticles');
    // Make sure state updates properly
    cy.get(SEARCH_INPUT).should('have.value', 'java');
};

const checkSearchPage = page =>
    cy.get(SEARCH_PAGINATION_TEXT).within(() => {
        cy.contains(`${page}/2`);
    });

const checkDisabled = el => el.should('have.attr', 'aria-disabled', 'true');

describe('search', () => {
    it('should properly render a toggleable search', () => {
        // Change viewport, as here it is condensed by default
        cy.viewport(1040, 660);
        cy.visitWithoutFetch('/');
        checkCondensedSearchbar();
    });
    it('should expand search by default on certain sizes', () => {
        // This will reset the viewport to default
        cy.get(SEARCHBAR).should('exist');
    });
    it('should accept a search query', () => {
        mockJavaSearch();
        // The below line ensures we wait until the stub is done
        cy.get(SEARCH_RESULT).should('have.length', 3);
    });
    it('should show some search results', () => {
        checkSearchResults(1);
    });
    it('should paginate', () => {
        checkSearchPage(1);
        checkDisabled(cy.get(BACK_PAGE_BUTTON));
        cy.get(FORWARD_PAGE_BUTTON).click();
        checkSearchPage(2);
        checkSearchResults(2);
        checkDisabled(cy.get(FORWARD_PAGE_BUTTON));
        cy.get(BACK_PAGE_BUTTON).click();
        checkSearchPage(1);
        checkSearchResults(1);
    });
    it('should have an empty state', () => {
        cy.mockEmptySearchResponse();
        cy.get(SEARCH_INPUT).clear();
        cy.get(SEARCH_INPUT).type('node');
        cy.wait('@searchEmptyArticles');
        cy.get(SEARCH_DROPDOWN).within(() => {
            cy.contains('There are no search results');
        });
    });
    it('should be mobile responsive', () => {
        cy.viewport('iphone-5');
        cy.visitWithoutFetch('/');
        checkCondensedSearchbar();
        mockJavaSearch();
        // The below line ensures we wait until the stub is done
        cy.get(SEARCH_RESULT).should('have.length', 6);
        checkSearchResults(1);
    });
});
