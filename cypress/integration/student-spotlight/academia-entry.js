const ENTRY_URL = '/academia/';

describe('Academia Entry Page', () => {
    it('should render the entry page', () => {
        cy.visit(ENTRY_URL);
    });
    it('should have a header', () => {
        cy.contains('MongoDB for Academia');
    });
});
