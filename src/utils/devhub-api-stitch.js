import { STITCH_AUTH_APP_ID } from '../constants';
import { callStitchFunction } from './stitch-common';

export const callDevhubAPIStitchFunction = async (fnName, ...fnArgs) => {
    try {
        return callStitchFunction(fnName, STITCH_AUTH_APP_ID, [...fnArgs]);
    } catch (error) {
        console.error(error);
    }
};

export const requestYoutubePlaylist = async (playlistId, maxResults) => {
    const result = await callDevhubAPIStitchFunction('fetchYoutubeData', {
        playlistId,
        maxResults,
    });
    return result;
};
