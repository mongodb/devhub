import { removePageIfStaged } from '../../src/utils/setup/remove-page-if-staged';

it('should properly require specific environment variables at build-time', () => {
    const oldEnv = process.env;
    process.env = {
        ...oldEnv,
    };

    const testExistingPage = { path: '/academia/' };
    const testNonExistingPage = { path: '/foo/' };

    let deletePage = jest.fn();

    process.env.SNOOTY_ENV = 'staging';
    const stagedPages = ['/academia/', '/media/'];

    removePageIfStaged(testExistingPage, deletePage, stagedPages);
    removePageIfStaged(testNonExistingPage, deletePage, stagedPages);

    // Staged pages should only be removed on production
    expect(deletePage).toHaveBeenCalledTimes(0);

    process.env.SNOOTY_ENV = 'production';
    removePageIfStaged(testExistingPage, deletePage, stagedPages);
    removePageIfStaged(testNonExistingPage, deletePage, stagedPages);

    expect(deletePage).toHaveBeenCalledTimes(1);
    expect(deletePage.mock.calls[0][0]).toStrictEqual(testExistingPage);

    process.env = oldEnv;
});
