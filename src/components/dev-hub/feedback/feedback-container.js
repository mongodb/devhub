import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import dlv from 'dlv';
import { graphql, useStaticQuery } from 'gatsby';
import CMSForm from '~components/dev-hub/cms-form';
import { H5, P } from '~components/dev-hub/text';
import Modal from '~components/dev-hub/modal';
import Button from '~components/dev-hub/button';

import { fontSize, lineHeight, size } from '~components/dev-hub/theme';

const feedbackItems = graphql`
    query FeedbackItems {
        strapiFeedbackRatingFlow {
            ...FeedbackFlows
        }
    }
`;

const StyledButtonContainer = styled('div')`
    display: flex;
    justify-content: center;
    margin-bottom: 4px;
`;

const StyledForm = styled('form')`
    padding: 0 ${size.medium};

    button,
    label,
    textarea {
        margin: ${size.default} 0;
    }

    input {
        margin-bottom: ${size.default};
    }
`;

const StyledDescription = styled(P)`
    display: inline-block;
    font-family: Akzidenz;
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
`;

const MODAL_WIDTH = '400px';

export const STAR_RATING_FLOW = {
    ONE: 'one',
    TWO: 'two',
    THREE: 'three',
    FOUR: 'four',
    FIVE: 'five',
};

const getStarRatingFlow = (data, star, step) => {
    const {
        OneStarRatingFlow,
        TwoStarRatingFlow,
        ThreeStarRatingFlow,
        FourStarRatingFlow,
        FiveStarRatingFlow,
    } = dlv(data, 'strapiFeedbackRatingFlow', {});

    switch (star) {
        case STAR_RATING_FLOW.ONE:
            return {
                ratingFlow: OneStarRatingFlow?.forms[step],
                stepsCounter: OneStarRatingFlow?.forms?.length,
            };
        case STAR_RATING_FLOW.TWO:
            return {
                ratingFlow: TwoStarRatingFlow?.forms[step],
                stepsCounter: TwoStarRatingFlow?.forms?.length,
            };
        case STAR_RATING_FLOW.THREE:
            return {
                ratingFlow: ThreeStarRatingFlow?.forms[step],
                stepsCounter: ThreeStarRatingFlow?.forms?.length,
            };
        case STAR_RATING_FLOW.FOUR:
            return {
                ratingFlow: FourStarRatingFlow?.forms[step],
                stepsCounter: FourStarRatingFlow?.forms?.length,
            };
        case STAR_RATING_FLOW.FIVE:
            return {
                ratingFlow: FiveStarRatingFlow?.forms[step],
                stepsCounter: FiveStarRatingFlow?.forms?.length,
            };
        default:
            return {};
    }
};

const FeedbackContainer = ({ onSubmit, starRatingFlow }) => {
    const [step, setStep] = useState(0);
    const data = useStaticQuery(feedbackItems);

    const {
        ratingFlow = {},
        stepsCounter,
    } = getStarRatingFlow(data, starRatingFlow, step);

    const { title, description, cta: button } = ratingFlow;

    const isActiveModal = step < stepsCounter;

    return isActiveModal ? (
        <Modal
            isOpenToStart={true}
            verticallyCenter
            contentStyle={{
                'max-width': MODAL_WIDTH,
                'min-width': MODAL_WIDTH,
            }}
        >
            <StyledForm
                onSubmit={e => {
                    e.preventDefault();
                    onSubmit('Some value');
                    setStep(step + 1);
                }}
            >
                {title && <H5 collapse>{title}</H5>}
                {description && (
                    <StyledDescription>{description}</StyledDescription>
                )}

                <CMSForm form={ratingFlow} />

                {button && (
                    <StyledButtonContainer>
                        <Button hasArrow={button !== 'Send'} primary>
                            {button}
                        </Button>
                    </StyledButtonContainer>
                )}
            </StyledForm>
        </Modal>
    ) : null;
};

FeedbackContainer.propTypes = {
    onSubmit: PropTypes.func,
    starRatingFlow: PropTypes.oneOf([...Object.values(STAR_RATING_FLOW)]),
};

export default FeedbackContainer;
