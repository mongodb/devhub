import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { P } from './text';
import { animationSpeed, colorMap, fontSize, size } from './theme';

const CloseIcon = styled(P)`
    color: ${colorMap.devWhite};
    font-size: ${fontSize.micro};
    margin-left: auto;
    padding: ${size.default};

    /* TODO replace P with a button here and remove hover CSS */
    :hover {
        cursor: pointer;
    }
`;

const LiveNowBadgeContainer = styled('div')`
    border: 1px solid ${colorMap.lightGreen};
    border-radius: ${size.small};
    margin-right: ${size.small};
    padding: ${size.tiny} ${size.small};
    &:before {
        /* 25cf is "SMALL DOT" */
        content: '\u25cf ';
    }
`;

const NotificationText = styled('div')`
    align-items: center;
    color: ${colorMap.devWhite};
    display: flex;
    margin-left: auto;
`;

const StyledNotification = styled('div')`
    align-items: center;
    background-color: ${colorMap.greyDarkTwo};
    border-radius: ${size.medium};
    display: flex;
    justify-content: center;
    opacity: 0.8;

    :hover {
        cursor: pointer;
        opacity: 1;
        transition: opacity ${animationSpeed.fast} ease ${animationSpeed.fast};
    }
`;

// TODO case on different notification types
// eslint-disable-next-line no-unused-vars
const Notification = ({ link = null, notificationType = 'twitch' }) => {
    // TODO add async call to twitch
    const [isVisible, setIsVisible] = useState(true);
    const dismissNotification = useCallback(() => setIsVisible(false), [
        setIsVisible,
    ]);
    return (
        isVisible && (
            <StyledNotification>
                <NotificationText>
                    <LiveNowBadgeContainer>Live Now</LiveNowBadgeContainer>
                    <P collapse>
                        Building the world’s first IoT kitty litter box — Join
                        us on Twitch!
                    </P>
                </NotificationText>
                <CloseIcon collapse onClick={dismissNotification}>
                    X
                </CloseIcon>
            </StyledNotification>
        )
    );
};

Notification.displayName = 'Notification';

export default Notification;
