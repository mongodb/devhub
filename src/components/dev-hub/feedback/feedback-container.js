import React, {
    useCallback,
    useContext,
    useEffect,
    useState,
    memo,
} from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Modal from '~components/dev-hub/modal';
import FeedbackFinalStep from '~components/dev-hub/feedback/feedback-final-step';
import getStarRatingFlow from '~components/dev-hub/feedback/helpers/getStarRatingFlow';
import FeedbackForm from '~components/dev-hub/feedback/feedback-form';
import useFeedback from '~hooks/use-feedback';
import StarRatingList from './star-rating-list';
import { FeedbackFormContext } from '~components/dev-hub/feedback/feedback-context';
import {
    ArticleRatingContext,
    STAR_ACTIONS,
    STAR_RATING_FLOW,
} from '~components/ArticleRatingContext';
import BalloonsIcon from '~components/dev-hub/icons/balloons-icon';
import { screenSize, size } from '~components/dev-hub/theme';
import useViewport from '~hooks/use-viewport';

const feedbackItems = graphql`
    query FeedbackItems {
        strapiFeedbackRatingFlow {
            ...FeedbackFlows
        }
    }
`;

const MODAL_WIDTH = '400px';

const modalStyles = css`
    max-width: ${MODAL_WIDTH};
    min-width: ${MODAL_WIDTH};

    @media ${screenSize.upToMedium} {
        border: none;
        border-radius: 0;
        min-height: 100vh;
        max-width: unset;
        min-width: unset;
        padding: 0;
        width: 100%;
    }
`;

const headingStyles = css`
    @media ${screenSize.upToMedium} {
        padding: ${size.default};
    }
`;

const StyledStarRatingList = styled(StarRatingList)`
    background-color: ${({ theme }) => theme.colorMap.devBlack};
    margin: -${size.xlarge} 0 ${size.large};
    /* padding top is the size of the X on the modal (default) + 2*medium padding around it */
    /* Hardcoding 40px as that is a specific ask */
    padding: calc(${size.medium} + ${size.medium} + ${size.default}) 0
        ${size.large} 40px;
    width: 100%;
    @media ${screenSize.mediumAndUp} {
        display: none;
    }
`;

const getAuthorsNames = authors => authors?.map(({ name }) => name);

const FeedbackContainer = ({ starRatingFlow, articleMeta, closeModal }) => {
    const [step, setStep] = useState(0);
    const { formState } = useContext(FeedbackFormContext);
    const { ratingDispatch } = useContext(ArticleRatingContext);
    const { createFeedback, submitFeedback, updateFeedback } = useFeedback();

    const data = useStaticQuery(feedbackItems);
    const { ratingFlow, stepsCounter } = getStarRatingFlow(
        data,
        starRatingFlow,
        step
    );

    const isActiveModal = step < stepsCounter + 1;
    const isLastModal = step === stepsCounter;

    useEffect(() => {
        const { authors, slug, title } = articleMeta;
        createFeedback({
            authors: getAuthorsNames(authors),
            slug,
            title,
            starRatingFlow,
        });
    }, [articleMeta, createFeedback, starRatingFlow]);

    const incrementStepHandler = useCallback(() => {
        setStep(step + 1);
    }, [step]);

    const onSubmitHandler = useCallback(() => {
        updateFeedback(formState);
        if (step < stepsCounter) {
            incrementStepHandler();
        }
        if (isLastModal) {
            submitFeedback();
        }
    }, [
        formState,
        incrementStepHandler,
        isLastModal,
        step,
        stepsCounter,
        submitFeedback,
        updateFeedback,
    ]);

    //Sent form information and refresh rating logic
    const onCloseModalHandler = useCallback(() => {
        updateFeedback(formState);
        if (!isLastModal) {
            ratingDispatch(STAR_ACTIONS.CLEAR);
        }
        closeModal();
    }, [closeModal, formState, isLastModal, ratingDispatch, updateFeedback]);

    useViewport();

    return isActiveModal ? (
        <Modal
            onCloseModal={onCloseModalHandler}
            isOpenToStart
            verticallyCenter
            contentStyle={modalStyles}
            headingStyles={headingStyles}
            dialogMobileContainerStyle={{
                minHeight: '100vh',
                height: 'fit-content',
                padding: 0,
                width: '100%',
            }}
        >
            <StyledStarRatingList />
            {isLastModal ? (
                <FeedbackFinalStep incrementStep={incrementStepHandler} />
            ) : (
                <FeedbackForm
                    ratingFlow={ratingFlow}
                    onSubmit={onSubmitHandler}
                    icon={
                        starRatingFlow === STAR_RATING_FLOW.FIVE && (
                            <BalloonsIcon />
                        )
                    }
                />
            )}
        </Modal>
    ) : null;
};

FeedbackContainer.propTypes = {
    onSubmit: PropTypes.func,
    starRatingFlow: PropTypes.oneOf([...Object.values(STAR_RATING_FLOW)]),
};

export default memo(FeedbackContainer);
