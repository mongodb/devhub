// const FEATURED_PROJECT = '[data-test="featured-project"]';
// const FEATURED_PROJECT_DESCRIPTION =
//     'Learn MongoDB by creating a database for dog care providers!';
// const FEATURED_PROJECT_TITLE =
//     'Database Development for Dog Care Providers (DCP)';
// const FEATURED_PROJECT_URL = '/project/database-development-dcp/';
// const FIRST_PROJECT_DESCRIPTION = 'Learn MongoDB from Go-FIFA!';
// const FIRST_PROJECT_TITLE = 'Go-FIFA';
// const FIRST_PROJECT_URL = '/project/go-fifa/';
// const GALLERY_URL = '/academia/students/';
// const PROJECT_CARD = '[data-test="project-card"]';
//
// describe('Student Spotlight Gallery Page', () => {
//     it('should render the gallery page', () => {
//         cy.visit(GALLERY_URL);
//     });
//     it('should render a featured project', () => {
//         cy.get(FEATURED_PROJECT).within(() => {
//             cy.contains(FEATURED_PROJECT_TITLE);
//             cy.contains(FEATURED_PROJECT_DESCRIPTION);
//             cy.get('ul li')
//                 .first()
//                 .within($el => {
//                     expect($el.text()).to.equal('Atlas');
//                 });
//             cy.get('a')
//                 .last()
//                 .should('have.attr', 'href')
//                 .and('eq', FEATURED_PROJECT_URL);
//         });
//     });
//     it('should have a grid of projects', () => {
//         cy.contains('All Projects');
//         cy.get(PROJECT_CARD).should('have.length', 7);
//         cy.get(PROJECT_CARD)
//             .first()
//             .within(() => {
//                 cy.contains(FIRST_PROJECT_TITLE);
//                 cy.contains(FIRST_PROJECT_DESCRIPTION);
//             });
//         cy.get(PROJECT_CARD)
//             .first()
//             .should('have.attr', 'href')
//             .and('eq', FIRST_PROJECT_URL);
//     });
// });
