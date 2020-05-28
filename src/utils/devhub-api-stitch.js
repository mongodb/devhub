const { STITCH_AUTH_APP_ID } = require('../build-constants');
const { callStitchFunction } = require('./stitch-common');

const callDevhubAPIStitchFunction = async (fnName, ...fnArgs) => {
    try {
        return callStitchFunction(fnName, STITCH_AUTH_APP_ID, [...fnArgs]);
    } catch (error) {
        console.error(error);
    }
};

const requestMDBTwitchStream = async () => {
    const result = await callDevhubAPIStitchFunction('fetchMDBTwitchStream');
    return result;
};

const requestMDBTwitchVideos = async videoLimit => {
    const result = await callDevhubAPIStitchFunction(
        'fetchMDBTwitchVideos',
        videoLimit
    );
    return result;
};

const requestYoutubePlaylist = async maxResults => {
    const result = await callDevhubAPIStitchFunction(
        'fetchYoutubeData',
        maxResults
    );
    return result;
};

const submitAcademiaForm = async academiaData => {
    const result = await callDevhubAPIStitchFunction(
        'submitAcademiaRegistration',
        academiaData
    );
    return result;
};

module.exports = {
    requestMDBTwitchStream,
    requestMDBTwitchVideos,
    requestYoutubePlaylist,
    submitAcademiaForm,
};
