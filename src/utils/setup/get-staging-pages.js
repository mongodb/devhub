import { initStitch } from './init-stitch';
import { STITCH_AUTH_APP_ID } from '../../constants';

export const getStagingPages = async () => {
    const client = await initStitch(STITCH_AUTH_APP_ID);
    const stagingPages = await client.callFunction('fetchStagingPages', []);
    return stagingPages;
};
