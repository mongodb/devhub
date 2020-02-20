const getDatabase = () => {
    if (process.env.SNOOTY_ENV === 'staging') {
        return 'snooty_stage';
    } else if (process.env.SNOOTY_ENV === 'production') {
        return 'snooty_prod';
    }
    return 'snooty_dev';
};

module.exports.getDatabase = getDatabase;
