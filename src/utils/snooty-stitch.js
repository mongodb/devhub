import { SNOOTY_STITCH_ID } from '../build-constants';
import { callStitchFunction } from './stitch-common';

const callSnootyStitchFunction = async (fnName, metadata, ...fnArgs) => {
    try {
        return callStitchFunction(fnName, SNOOTY_STITCH_ID, [
            metadata,
            ...fnArgs,
        ]);
    } catch (error) {
        console.error(error);
    }
};

export const submitDevhubProject = async (metadata, object, segmentData) =>
    await callSnootyStitchFunction(
        'submitDevhubProject',
        metadata,
        object,
        segmentData
    );
