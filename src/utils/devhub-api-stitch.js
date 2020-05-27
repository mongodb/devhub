import { STITCH_AUTH_APP_ID } from '../constants';
import { callStitchFunction } from './stitch-common';

const callDevhubAPIStitchFunction = async (fnName, ...fnArgs) => {
    try {
        return callStitchFunction(fnName, STITCH_AUTH_APP_ID, [...fnArgs]);
    } catch (error) {
        console.error(error);
    }
};

export const requestMDBTwitchStream = async () => {
    const result = await callDevhubAPIStitchFunction('fetchMDBTwitchStream');
    return result;
};

export const requestMDBTwitchVideos = async videoLimit => {
    const result = await callDevhubAPIStitchFunction(
        'fetchMDBTwitchVideos',
        videoLimit
    );
    return result;
};

export const requestYoutubePlaylist = async maxResults => {
    const result = await callDevhubAPIStitchFunction(
        'fetchYoutubeData',
        maxResults
    );
    return result;
};

export const submitAcademiaForm = async academiaData => {
    const result = await callDevhubAPIStitchFunction(
        'submitAcademiaRegistration',
        academiaData
    );
    return result;
};
