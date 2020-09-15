import { constructDbFilter } from '../../src/utils/setup/construct-db-filter';

it('should properly create a filter for the specified environment', () => {
    let commitHash = 'COMMIT_HASH';
    let patchId = 'PATCH_ID';
    const pageIdPrefix = 'devhub/testUser/master';
    let filter = constructDbFilter(pageIdPrefix, commitHash, patchId);

    // Should have a regex
    expect(filter.page_id['$regex']).toStrictEqual(
        new RegExp(`^${pageIdPrefix}/*`)
    );

    // Should have a commit hash
    expect(filter.commit_hash).toBe(commitHash);
    expect(filter.patch_id).toBe(patchId);

    commitHash = undefined;
    patchId = undefined;

    // Should now show the commit hash does not exist in the filter
    filter = constructDbFilter(pageIdPrefix, commitHash, patchId);
    expect(filter.commit_hash).toStrictEqual({ $exists: false });
    expect(filter.patch_id).toStrictEqual({ $exists: false });
});
