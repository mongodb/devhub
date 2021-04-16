import { useCallback, useState } from 'react';
import { createDevhubFeedback } from '~utils/devhub-api-stitch';
import useSegmentData from '~hooks/use-segment-data';

//WIP
const useFeedback = () => {
    const { segmentAnonymousId } = useSegmentData();

    const createFeedback = useCallback(
        async ({ author, slug, title }) => {
            console.log('Test - FeedBackData', {
                authorNames: getAuthorsNames(author),
                rating: starRatingFlow,
                title: title[0].value,
                slug,
                segment_id: segmentAnonymousId,
            });
            const feedbackId = await createDevhubFeedback({
                authorNames: getAuthorsNames(author),
                rating: starRatingFlow,
                title: title[0].value,
                slug,
                segment_id: segmentAnonymousId,
            });

            setFeedbackId(feedbackId);
        },
        [segmentAnonymousId, starRatingFlow]
    );

    const createFeedback = useCallback(
        async ({ author, slug, title }) => {
            console.log('Test - FeedBackData', {
                authorNames: getAuthorsNames(author),
                rating: starRatingFlow,
                title: title[0].value,
                slug,
                segment_id: segmentAnonymousId,
            });
            const feedbackId = await createDevhubFeedback({
                authorNames: getAuthorsNames(author),
                rating: starRatingFlow,
                title: title[0].value,
                slug,
                segment_id: segmentAnonymousId,
            });

            setFeedbackId(feedbackId);
        },
        [segmentAnonymousId, starRatingFlow]
    );

    const [feedbackId, setFeedbackId] = useState(0);
}

return default useFeedback;
