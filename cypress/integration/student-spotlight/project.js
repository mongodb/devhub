// const GITHUB_URL = 'http://github.url';
// const GO_FIFA_DESCRIPTION = 'Learn MongoDB from Go-FIFA!';
// const GO_FIFA_TITLE = 'Go-FIFA';
// const LINKEDIN_LINK = 'http://linkedin.link';
// const PROJECT_CONTENT = 'Project content goes here';
// const PROJECT_DESCRIPTION = 'Project description';
// const PROJECT_LINK = 'http://project.link';
// const PROJECT_NAME = 'Test Student Project';
// const PROJECT_URL = '/project/test/';
// const STUDENT_BIO = 'Student Bio';
// const STUDENT_NAME = 'Test Student';
// const YOUTUBE_LINK = 'http://youtube.link';
//
// describe('Project Page', () => {
//     it('should create a page for a project at a given slug', () => {
//         cy.visit(PROJECT_URL);
//         cy.get('header');
//     });
//
//     it('should have information about a project in the header', () => {
//         cy.get('header').within(() => {
//             cy.contains(PROJECT_NAME);
//             cy.contains(PROJECT_DESCRIPTION);
//
//             // Check the breadcrumbs have been constructed properly
//             cy.get('[data-test="breadcrumbs"]').within(() => {
//                 cy.get('a').should('have.length', 4);
//                 cy.get('a')
//                     .eq(2)
//                     .should('have.attr', 'href')
//                     .and('include', '/academia/students/');
//                 cy.get('a')
//                     .eq(3)
//                     .should('have.attr', 'href')
//                     .and('include', PROJECT_URL);
//             });
//         });
//     });
//
//     it('should have content for a project', () => {
//         cy.get('article').within(() => {
//             cy.contains(PROJECT_CONTENT);
//         });
//         cy.get('[data-test="sidebar"]').within(() => {
//             // Tags
//             cy.get('ul')
//                 .first()
//                 .within(() => {
//                     cy.get('li').first(() => {
//                         cy.contains('mongodb');
//                     });
//                 });
//             // Links
//             cy.get('a')
//                 .first()
//                 .should('have.attr', 'href')
//                 .and('equal', GITHUB_URL);
//             cy.get('a')
//                 .eq(1)
//                 .should('have.attr', 'href')
//                 .and('equal', PROJECT_LINK);
//             // Author
//             cy.get('[data-test="student"]').within(() => {
//                 cy.contains(STUDENT_NAME).click();
//                 cy.contains(STUDENT_BIO);
//                 cy.contains(LINKEDIN_LINK);
//                 cy.contains(YOUTUBE_LINK);
//             });
//         });
//     });
//
//     it('should feature some other projects', () => {
//         cy.get('[data-test="additional-projects"]').within(() => {
//             cy.contains('Explore more Student Spotlights');
//             cy.get('[data-test="project-card"]')
//                 .first()
//                 .within(() => {
//                     cy.contains(GO_FIFA_TITLE);
//                     cy.contains(GO_FIFA_DESCRIPTION);
//                 });
//             cy.get('[data-test="project-card"]')
//                 .first()
//                 .should('have.attr', 'href')
//                 .and('eq', '/project/go-fifa/');
//         });
//     });
// });
