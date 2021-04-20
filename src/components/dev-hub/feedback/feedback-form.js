import React, { memo } from 'react';
import styled from '@emotion/styled';
import { H5, P } from '~components/dev-hub/text';
import CMSForm from '~components/dev-hub/cms-form';
import Button from '~components/dev-hub/button';

import { fontSize, lineHeight, size } from '~components/dev-hub/theme';

const StyledButtonContainer = styled('div')`
    display: flex;
    justify-content: center;
    margin-bottom: 4px;
`;

const StyledForm = styled('form')`
    padding: 0 ${size.medium};

    button,
    > label {
        margin: ${size.default} 0;
    }
`;

const StyledDescription = styled(P)`
    display: inline-block;
    font-family: Akzidenz;
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
`;

const FeedbackForm = ({ ratingFlow = {}, onSubmit }) => {
    const { title, description, cta: button } = ratingFlow;

    return (
        <StyledForm
            onSubmit={e => {
                e.preventDefault();
                onSubmit();
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
    );
};

export default memo(FeedbackForm);
