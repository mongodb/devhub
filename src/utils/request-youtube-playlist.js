import { STITCH_AUTH_APP_ID } from '../constants';
import { authenticate, callStitchAuthenticationFunction } from './stitch';

export const requestYoutubePlaylist = async (
    playlistId,
    maxResults,
    appId = STITCH_AUTH_APP_ID
) => {
    await authenticate(STITCH_AUTH_APP_ID);
    const result = await callStitchAuthenticationFunction(
        'fetchYoutubeData',
        appId,
        {
            playlistId,
            maxResults,
        }
    );
    return result;
};
