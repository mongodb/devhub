import React, { memo } from 'react';
import Link from '~components/dev-hub/link';
import { H5, P } from '~components/dev-hub/text';
import Button from '~components/dev-hub/button';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
    colorMap,
    fontSize,
    lineHeight,
    screenSize,
    size,
} from '~components/dev-hub/theme';
import { FORUMS_URL } from '~src/constants';

const changeColorOnHover = theme => css`
    &:hover {
        color: ${theme.colorMap.devWhite};
    }
`;

const StyledContainer = styled('div')`
    padding: 0 ${size.medium};
    @media ${screenSize.upToMedium} {
        padding: 0 40px;
    }
`;

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.colorMap.lightGreen};
    ${({ theme }) => changeColorOnHover(theme)};
    &:visited {
        color: ${({ theme }) => theme.colorMap.lightGreen};
        ${({ theme }) => changeColorOnHover(theme)};
    }
`;

const StyledTitle = styled(H5)`
    margin-bottom: ${size.mediumLarge};
    /*
        Hardcoding this in since 364px is the width with padding, we need more than
        what 50% would give
    */
    max-width: 180px;
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.xsmall};
        /* Font size decreases so we have to adjust max width */
        max-width: 170px;
    }
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
    <StyledContainer>
        <StyledTitle>We appreciate your feedback.</StyledTitle>
        <StyledDescription>
            We'd love to chat with you and answer your questions in our online{' '}
            <StyledLink target="_blank" href={FORUMS_URL}>
                MongoDB Community
            </StyledLink>
            . It's where people who develop MongoDB hang out with people who
            develop with MongoDB.
        </StyledDescription>
        <StyledButtonContainer>
            <Button hasArrow={false} primary onClick={incrementStep}>
                Close
            </Button>
        </StyledButtonContainer>
    </StyledContainer>
);

export default memo(FeedbackFinalStep);
