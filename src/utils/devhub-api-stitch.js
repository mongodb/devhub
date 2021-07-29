import { FEEDBACK_APP_ID, STITCH_AUTH_APP_ID } from '../constants';
import { callStitchFunction } from './stitch-common';

const callRealmFunction = appId => async (fnName, ...fnArgs) => {
    try {
        return callStitchFunction(fnName, appId, [...fnArgs]);
    } catch (error) {
        console.error(error);
    }
};

const callDevhubAPIStitchFunction = callRealmFunction(STITCH_AUTH_APP_ID);
const callDevhubFeedbackFunction = callRealmFunction(FEEDBACK_APP_ID);

// DevHub Authentication App Functions

export const requestLybsinPodcasts = async () => {
    const result = await callDevhubAPIStitchFunction('fetchLybsinPodcasts');
    return result;
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

export const requestTextFilterResults = async query => {
    const result = await callDevhubAPIStitchFunction(
        'fetchTextFilterResults',
        query
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

export const submitDevhubProject = async (metadata, object, segmentData) => {
    const result = await callDevhubAPIStitchFunction(
        'submitCommunityProject',
        metadata,
        object,
        segmentData
    );
    return result;
};

export const submitStudentSpotlightProject = async projectData => {
    const result = await callDevhubAPIStitchFunction(
        'submitStudentSpotlightProject',
        projectData
    );
    return result;
};

export const submitCommunityChampionApplication = async (
    communityChampionData,
    onSuccess,
    onFailure
) => {
    try {
        const result = await callDevhubAPIStitchFunction(
            'submitCommunityChampionApplication',
            communityChampionData
        );
        result && onSuccess();
    } catch {
        onFailure();
    }
};

// DevHub Feedback App Functions

// Call as the feedback modal is opened
export const createDevhubFeedback = async ({
    authorNames,
    rating,
    title,
    slug,
    segment_id,
}) => {
    const result = await callDevhubFeedbackFunction('createFeedback', {
        authorNames,
        rating,
        title,
        slug,
        segment_id,
    });
    // This returns the ID of the user's feedback object, let's store it for later updating
    return result;
};

// Call to submit the feedback
export const submitDevhubFeedback = async feedbackId => {
    const result = await callDevhubFeedbackFunction(
        'submitFeedback',
        feedbackId
    );
    return result;
};

// Call when an entry is changed/selected
export const updateDevhubFeedback = async ({
    feedbackId,
    ...formResponses
}) => {
    const result = await callDevhubFeedbackFunction('updateFeedback', {
        feedbackId,
        ...formResponses,
    });
    return result;
};
