import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { P } from './text';
import { animationSpeed, fontSize, size } from './theme';

const blink = keyframes`
    50% {
    opacity: 0;
  }
`;

const CloseIcon = styled(P)`
    color: ${({ theme }) => theme.colorMap.devWhite};
    margin-left: auto;
    /* padding: ${size.default}; */

    /* TODO replace P with a button here and remove hover CSS */
    :hover {
        cursor: pointer;
    }

    &:after {
        content: '\u2715';
    }
`;

const LiveNowBadgeContainer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    border: 1px solid ${({ theme }) => theme.colorMap.salmon};
    border-radius: ${size.medium};
    color: ${({ theme }) => theme.colorMap.salmon};
    font-size: ${fontSize.micro};
    font-weight: bold;
    margin-right: ${size.small};
    padding: 0 ${size.small};
    text-transform: uppercase;
    white-space: nowrap;
    &:before {
        /* TODO: codify this animation speed in the theme */
        animation: ${blink} 2s ease infinite;
        /* 25cf is "SMALL DOT" */
        content: '\u25cf ';
    }
`;

const NotificationLink = styled('a')`
    align-items: center;
    color: ${({ theme }) => theme.colorMap.devWhite};
    display: flex;
    margin-left: auto;
    text-decoration: none;
`;

const StyledNotification = styled('div')`
    align-items: center;
    background-color: ${({ theme }) => theme.colorMap.greyDarkTwo};
    display: flex;
    font-size: ${fontSize.tiny};
    justify-content: center;
    opacity: 0.8;
    padding: ${size.small} ${size.default};
    :hover {
        cursor: pointer;
        opacity: 1;
        transition: opacity ${animationSpeed.fast} ease ${animationSpeed.fast};
    }
`;

// TODO case on different notification types
// TODO handle non link notifications
const Notification = ({
    link = null,
    title,
    /* , notificationType = 'twitch' */
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const dismissNotification = useCallback(() => setIsVisible(false), [
        setIsVisible,
    ]);
    if (!isVisible || !title) {
        return null;
    }
    return (
        <StyledNotification>
            <NotificationLink
                href={link}
                target="_blank"
                rel="noreferrer noopener"
            >
                <LiveNowBadgeContainer>Live Now</LiveNowBadgeContainer>
                <P collapse>{title}</P>
            </NotificationLink>
            <CloseIcon collapse onClick={dismissNotification} />
        </StyledNotification>
    );
};

export default Notification;
