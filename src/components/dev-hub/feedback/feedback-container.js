import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import dlv from 'dlv';
import { graphql, useStaticQuery } from 'gatsby';
import CMSForm, { InputContainer } from '~components/dev-hub/cms-form';
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
    label {
        margin: ${size.default} 0;
    }

    ${InputContainer} {
        margin: ${size.default} 0;
    }
`;

const StyledDescription = styled(P)`
    display: inline-block;
    font-family: Akzidenz;
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
`;

const StyledHeader = styled(H5)`
    margin-bottom: 0;
`;

const getStarRatingFlow = (data, star, step) => {
    const {
        OneStarRatingFlow,
        TwoStarRatingFlow,
        ThreeStarRatingFlow,
        FourStarRatingFlow,
        FiveStarRatingFlow,
    } = dlv(data, 'strapiFeedbackRatingFlow', {});

    switch (star) {
        case 'one':
            return OneStarRatingFlow?.forms[step];
        case 'two':
            return TwoStarRatingFlow?.forms[step];
        case 'three':
            return ThreeStarRatingFlow?.forms[step];
        case 'four':
            return FourStarRatingFlow?.forms[step];
        case 'five':
            return FiveStarRatingFlow?.forms[step];
        default:
            return [];
    }
};

const FeedbackContainer = ({ onSubmit, starRatingFlow }) => {
    const [step, setStep] = useState(0);
    const data = useStaticQuery(feedbackItems);

    const ratingFlow = getStarRatingFlow(data, starRatingFlow, step);

    const title = ratingFlow?.title;
    const description = ratingFlow?.description;
    const button = ratingFlow?.cta;

    const isActiveModal = step < 2;

    return isActiveModal ? (
        <Modal
            isOpenToStart={true}
            verticallyCenter
            contentStyle={{
                'max-width': '400px',
                'min-width': '400px',
            }}
        >
            <StyledForm
                onSubmit={e => {
                    e.preventDefault();
                    onSubmit('Some value');
                    setStep(prevState => prevState + 1);
                }}
            >
                {title && <StyledHeader>{title}</StyledHeader>}
                {description && (
                    <StyledDescription>{description}</StyledDescription>
                )}

                <CMSForm form={ratingFlow || []} />

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
    starRatingFlow: PropTypes.oneOf(['one', 'two', 'three', 'four', 'five']),
};

export default FeedbackContainer;
