const constructDbFilter = pageIdPrefix => ({
    page_id: { $regex: new RegExp(`^${pageIdPrefix}/*`) },
    commit_hash: process.env.COMMIT_HASH || { $exists: false },
});

module.exports = { constructDbFilter };
