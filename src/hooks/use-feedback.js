import { useCallback, useState } from 'react';
import useSegmentData from '~hooks/use-segment-data';
import {
    createDevhubFeedback,
    submitDevhubFeedback,
    updateDevhubFeedback,
} from '~utils/devhub-api-stitch';
import { RuntimeError } from '../classes/runtime-error';

const useFeedback = () => {
    const [feedbackId, setFeedbackId] = useState(null);
    const { segmentAnonymousId } = useSegmentData();

    const createFeedback = useCallback(
        async ({ authors, slug, title, starRatingFlow }) => {
            try {
                const feedbackId = await createDevhubFeedback({
                    authorNames: authors,
                    rating: starRatingFlow,
                    title,
                    slug,
                    segment_id: segmentAnonymousId,
                });
                setFeedbackId(feedbackId);
            } catch (error) {
                new RuntimeError(error);
            }
        },
        [segmentAnonymousId]
    );

    const updateFeedback = useCallback(
        async ({ responses = [], comment = '', email = null }) => {
            if (feedbackId) {
                try {
                    return await updateDevhubFeedback({
                        feedbackId,
                        comment,
                        responses,
                        email,
                    });
                } catch (error) {
                    new RuntimeError(error);
                }
            }
        },
        [feedbackId]
    );

    const submitFeedback = useCallback(async () => {
        if (feedbackId) {
            try {
                return await submitDevhubFeedback(feedbackId);
            } catch (error) {
                new RuntimeError(error);
            }
        }
    }, [feedbackId]);

    return { feedbackId, createFeedback, updateFeedback, submitFeedback };
};

export default useFeedback;
