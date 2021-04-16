import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import Modal from '~components/dev-hub/modal';
import FeedbackFinalStep from '~components/dev-hub/feedback/feedback-final-step';
import {
    getStarRatingFlow,
    STAR_RATING_FLOW,
} from '~components/dev-hub/feedback/helpers/getStarRatingFlow';
import FeedbackForm from '~components/dev-hub/feedback/feedback-form';
import {
    createDevhubFeedback,
    updateDevhubFeedback,
} from '~utils/devhub-api-stitch';
import useSegmentData from '~hooks/use-segment-data';

const getAuthorsNames = authors => authors?.map(({ name }) => name);

const feedbackItems = graphql`
    query FeedbackItems {
        strapiFeedbackRatingFlow {
            ...FeedbackFlows
        }
    }
`;

const MODAL_WIDTH = '400px';

const FeedbackContainer = ({ starRatingFlow, articleMeta }) => {
    const [step, setStep] = useState(0);
    const [feedbackId, setFeedbackId] = useState('');

    const data = useStaticQuery(feedbackItems);
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

    const updateFeeback = useCallback(
        async formData => {
            await updateDevhubFeedback({
                feedbackId,
                ...formData,
            });
        },
        [feedbackId]
    );

    useEffect(() => {
        createFeedback(articleMeta);
    }, [articleMeta, createFeedback]);

    const { ratingFlow = {}, stepsCounter } = getStarRatingFlow(
        data,
        starRatingFlow,
        step
    );

    const incrementStepHandler = useCallback(() => {
        setStep(step + 1);
    }, [step]);

    const onSubmitHandler = useCallback(
        data => {
            console.log('Form Submit', data);
            updateFeeback(data);
            incrementStepHandler();
        },
        [incrementStepHandler, updateFeeback]
    );

    const isActiveModal = step < stepsCounter + 1;
    const isLastModal = step === stepsCounter;

    return isActiveModal ? (
        <Modal
            isOpenToStart={true}
            verticallyCenter
            contentStyle={{
                maxWidth: MODAL_WIDTH,
                minWidth: MODAL_WIDTH,
            }}
        >
            {isLastModal ? (
                <FeedbackFinalStep incrementStep={incrementStepHandler} />
            ) : (
                <FeedbackForm
                    ratingFlow={ratingFlow}
                    onSubmit={onSubmitHandler}
                />
            )}
        </Modal>
    ) : null;
};

FeedbackContainer.propTypes = {
    onSubmit: PropTypes.func,
    starRatingFlow: PropTypes.oneOf([...Object.values(STAR_RATING_FLOW)]),
};

export default FeedbackContainer;
