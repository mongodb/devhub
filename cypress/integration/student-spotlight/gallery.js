const GALLERY_URL = '/academia/students/';

describe('Student Spotlight Gallery Page', () => {
    it('should render the gallery page', () => {
        cy.visit(GALLERY_URL);
    });
    it('should render a featured project', () => {
        cy.get('[data-test="featured-project"]').within(() => {
            cy.contains('Database Development for Dog Care Providers (DCP)');
            cy.contains(
                'Learn MongoDB by creating a database for dog care providers!'
            );
            cy.get('ul li')
                .first()
                .within($el => {
                    expect($el.text()).to.equal('Atlas');
                });
            cy.get('a')
                .last()
                .should('have.attr', 'href')
                .and('eq', '/project/database-development-dcp/');
        });
    });
    it('should have a grid of projects', () => {
        cy.contains('All Projects');
        cy.get('[data-test="project-card"]').should('have.length', 7);
        cy.get('[data-test="project-card"]')
            .first()
            .within(() => {
                cy.contains('Go-FIFA');
                cy.contains('Learn MongoDB from Go-FIFA!');
            });
        cy.get('[data-test="project-card"]')
            .first()
            .should('have.attr', 'href')
            .and('eq', '/project/go-fifa/');
    });
});
