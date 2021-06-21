const ENTRY_URL = '/academia/';

describe('Academia Entry Page', () => {
    it('should render the entry page', () => {
        cy.visit(ENTRY_URL);
    });
    it('should link to other locations', () => {
        cy.get('main').within(() => {
            cy.get('a')
                .first()
                .should('have.attr', 'href')
                .and('equal', 'https://www.mongodb.com/students');
            cy.get('a')
                .eq(1)
                .should('have.attr', 'href')
                .and('equal', '/academia/educators/');
            cy.get('a')
                .last()
                .should('have.attr', 'href')
                .and('equal', '/academia/students/');
        });
    });
    it('should have a project grid', () => {
        cy.get('[data-test="project-card"]')
            .first()
            .should('have.attr', 'href')
            .and('eq', '/project/go-fifa/');
    });
});
