import React, { memo } from 'react';
import Link from '~components/dev-hub/link';
import { H5, P } from '~components/dev-hub/text';
import Button from '~components/dev-hub/button';
import styled from '@emotion/styled';
import {
    fontSize,
    lineHeight,
    size,
    colorMap,
} from '~components/dev-hub/theme';

const StyledTitle = styled(H5)`
    margin-bottom: ${size.mediumLarge};
    max-width: 50%;
`;

const StyledDescription = styled(P)`
    font-family: Akzidenz;
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
    margin-bottom: ${size.large};
    color: ${colorMap.greyLightTwo};
`;

const StyledButtonContainer = styled('div')`
    display: flex;
    justify-content: center;
    margin-bottom: ${size.medium};
`;

const FeedbackFinalStep = ({ incrementStep }) => (
    <>
        <StyledTitle>We appreciate your feedback.</StyledTitle>
        <StyledDescription>
            We'd love to chat with you and answer your
            questions in our online <Link to="/community/forums/">MongoDB Community</Link>.
            It's where people who develop MongoDB hang out with people who develop with
            MongoDB.
        </StyledDescription>
        <StyledButtonContainer>
            <Button hasArrow={false} primary onClick={incrementStep}>
                Close
            </Button>
        </StyledButtonContainer>
    </>
);

export default memo(FeedbackFinalStep);
