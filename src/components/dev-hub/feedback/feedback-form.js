import React, { memo } from 'react';
import styled from '@emotion/styled';
import { H5, P } from '~components/dev-hub/text';
import CMSForm from '~components/dev-hub/cms-form';
import Button from '~components/dev-hub/button';

import {
    fontSize,
    lineHeight,
    screenSize,
    size,
    colorMap,
} from '~components/dev-hub/theme';

const IconContainer = styled('div')`
    display: flex;
    justify-content: center;
    margin-bottom: ${size.mediumLarge};
    @media ${screenSize.upToMedium} {
        display: none;
    }
`;

const StyledButtonContainer = styled('div')`
    display: flex;
    justify-content: center;
    margin-bottom: 4px;
`;

const StyledForm = styled('form')`
    padding: 0 ${size.medium};
    > label {
        margin: ${size.default} 0;
    }
`;

const StyledH5 = styled(H5)`
    margin-bottom: 4px;
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.xsmall};
    }
`;

const StyledButton = styled(Button)`
    margin: ${size.default} 0;
`;

const StyledDescription = styled(P)`
    display: inline-block;
    font-family: Akzidenz;
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
    color: ${colorMap.greyLightTwo};
`;

const FeedbackForm = ({ icon, ratingFlow = {}, onSubmit }) => {
    const { title, description, cta: button } = ratingFlow;

    return (
        <StyledForm
            onSubmit={e => {
                e.preventDefault();
                onSubmit();
            }}
        >
            {icon && <IconContainer>{icon}</IconContainer>}
            {title && <StyledH5 collapse>{title}</StyledH5>}
            {description && (
                <StyledDescription>{description}</StyledDescription>
            )}

            <CMSForm form={ratingFlow} />

            {button && (
                <StyledButtonContainer>
                    <StyledButton hasArrow={button !== 'Send'} primary>
                        {button}
                    </StyledButton>
                </StyledButtonContainer>
            )}
        </StyledForm>
    );
};

export default memo(FeedbackForm);
