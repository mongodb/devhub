const ENTRY_URL = '/academia/';
const FIRST_PROJECT_URL = '/project/go-fifa/';
const GALLERY_PAGE_URL = '/academia/students/';
const MONGODB_FOR_EDUCATORS_URL = '/academia/educators/';
const MONGODB_FOR_STUDENTS_URL = 'https://www.mongodb.com/students';

describe('Academia Entry Page', () => {
    it('should render the entry page', () => {
        cy.visit(ENTRY_URL);
    });
    it('should link to other locations', () => {
        cy.get('main').within(() => {
            cy.get('a')
                .first()
                .should('have.attr', 'href')
                .and('equal', MONGODB_FOR_STUDENTS_URL);
            cy.get('a')
                .eq(1)
                .should('have.attr', 'href')
                .and('equal', MONGODB_FOR_EDUCATORS_URL);
            cy.get('a')
                .last()
                .should('have.attr', 'href')
                .and('equal', GALLERY_PAGE_URL);
        });
    });
    it('should have a project grid', () => {
        cy.get('[data-test="project-card"]')
            .first()
            .should('have.attr', 'href')
            .and('eq', FIRST_PROJECT_URL);
    });
});
