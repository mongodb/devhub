import { constructDbFilter } from '../../src/utils/setup/construct-db-filter';

it('should properly create a filter for the specified environment', () => {
    const commitHash = 'COMMIT_HASH';
    expect(process.env.COMMIT_HASH).toBeUndefined();
    process.env.COMMIT_HASH = commitHash;
    const pageIdPrefix = 'devhub/testUser/master';
    let filter = constructDbFilter(pageIdPrefix);

    // Should have a regex
    expect(filter.page_id['$regex']).toStrictEqual(
        new RegExp(`^${pageIdPrefix}/*`)
    );

    // Should have a commit hash
    expect(filter.commit_hash).toBe(commitHash);

    delete process.env.COMMIT_HASH;
    expect(process.env.COMMIT_HASH).toBeUndefined();
    // Should now show the commit hash does not exist in the filter
    filter = constructDbFilter(pageIdPrefix);
    expect(filter.commit_hash).toStrictEqual({ $exists: false });
});
