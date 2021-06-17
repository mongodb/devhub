const GALLERY_URL = '/academia/students/';

describe('Student Spotlight Gallery Page', () => {
    it('should render the gallery page', () => {
        cy.visit(GALLERY_URL);
    });
    it('should have a grid of projects', () => {
        cy.contains('All projects');
    });
});
