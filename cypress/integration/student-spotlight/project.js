const PROJECT_CONTENT = 'Project content goes here';
const PROJECT_DESCRIPTION = 'Project description';
const PROJECT_NAME = 'Test Student Project';
const PROJECT_URL = '/project/test/';

describe('Project Page', () => {
    it('should create a page for a project at a given slug', () => {
        cy.visit(PROJECT_URL);
        cy.get('header');
    });

    it('should have information about a project in the header', () => {
        cy.get('header').within(() => {
            cy.contains(PROJECT_NAME);
            cy.contains(PROJECT_DESCRIPTION);

            // Check the breadcrumbs have been constructed properly
            cy.get('[data-test="breadcrumbs"]').within(() => {
                cy.get('a').should('have.length', 4);
                cy.get('a')
                    .eq(2)
                    .should('have.attr', 'href')
                    .and('include', '/academia/students/');
                cy.get('a')
                    .eq(3)
                    .should('have.attr', 'href')
                    .and('include', PROJECT_URL);
            });
        });
    });

    it('should have content for a project', () => {
        cy.get('article').within(() => {
            cy.contains(PROJECT_CONTENT);
        });
        cy.get('[data-test="sidebar"]').within(() => {
            // Tags
            // Links
            // Author
        });
    });

    it('should feature some other projects', () => {
        // Get other projects
    });
});
