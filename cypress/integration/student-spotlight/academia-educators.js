const EDUCATORS_URL = '/academia/educators/';

describe('Academia Educators Page', () => {
    it('should render the educators page', () => {
        cy.visit(EDUCATORS_URL);
    });
    it('should have a header', () => {
        cy.contains('MongoDB Academia for Educators');
    });
});
