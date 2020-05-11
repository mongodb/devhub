import React from 'react';
import styled from '@emotion/styled';
import Card from './card';
import { screenSize } from './theme';

const StyledIframe = styled('iframe')`
    height: 100%;
    width: 100%;
    border: none;
`;

const TwitchCard = styled(Card)`
    height: 100%;
    width: 100%;
    @media ${screenSize.upToLarge} {
        height: 300px;
    }
`;

// Fallback iframe for twitch
const TwitchFallbackCard = ({ maxWidth }) => (
    <TwitchCard collapseImage maxWidth={maxWidth}>
        <StyledIframe
            title="MongoDB Twitch"
            src="https://player.twitch.tv/?channel=MongoDB&parent=developer.mongodb.com&muted=true"
            frameborder="0"
            scrolling="no"
            allowfullscreen="true"
        />
    </TwitchCard>
);

export default TwitchFallbackCard;
