const constructDbFilter = (pageIdPrefix, commitHash, patchId) => ({
    page_id: { $regex: new RegExp(`^${pageIdPrefix}/*`) },
    commit_hash: commitHash || { $exists: false },
    patch_id: patchId || { $exists: false },
});

module.exports = { constructDbFilter };
