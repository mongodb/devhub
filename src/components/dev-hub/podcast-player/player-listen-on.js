import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Button from '~components/dev-hub/button';
import {
    AppleLogo,
    GoogleLogo,
    SpotifyLogo,
} from '~components/dev-hub/icons/audio-player';

import { colorMap, screenSize, size } from '~components/dev-hub/theme';

const APPLE_PODCASTS_URL =
    'https://podcasts.apple.com/us/podcast/the-mongodb-podcast/id1500452446';
const SPOTIFY_PODCASTS_URL =
    'https://open.spotify.com/show/0ibUtrJG4JVgwfvB2MXMSb?si=k1oOQ8JcSr6WtfeSMQ-kFA&nd=1';
const GOOGLE_PODCASTS_URL =
    'https://podcasts.google.com/feed/aHR0cHM6Ly9tb25nb2RiLmxpYnN5bi5jb20vcnNz?sa=X&ved=2ahUKEwiE97rnkfDrAhU1n3IEHanUCRUQ9sEGegQIARAC';

// This mobile size needs for logos responsive.
const SPECIAL_MOBILE = '480px';

const LogosContainer = styled('div')`
    align-items: center;
    display: flex;
    justify-content: center;

    @media only screen and (max-width: ${SPECIAL_MOBILE}) {
        flex-direction: column;
    }
`;

const StyledButton = styled(Button)`
    margin-right: ${size.large};
    padding: ${size.tiny};

    &:hover {
        svg > path {
            fill: ${colorMap.greyLightOne};
        }
    }

    &:active {
        svg > path {
            fill: #707f81;
        }
    }

    @media ${screenSize.upToMedium} {
        &:last-of-type {
            margin-right: 0;
        }
    }

    @media only screen and (max-width: ${SPECIAL_MOBILE}) {
        margin-right: 0;
        &:not(:last-of-type) {
            margin-bottom: ${size.medium};
        }
    }
`;

const PlayerListenOn = ({ className }) => (
    <LogosContainer data-test="player-links" className={className}>
        <StyledButton
            aria-label="google-podcasts"
            href={GOOGLE_PODCASTS_URL}
            target="_blank"
        >
            <GoogleLogo />
        </StyledButton>
        <StyledButton
            aria-label="spotify-podcasts"
            href={SPOTIFY_PODCASTS_URL}
            target="_blank"
        >
            <SpotifyLogo />
        </StyledButton>
        <StyledButton
            aria-label="apple-podcasts"
            href={APPLE_PODCASTS_URL}
            target="_blank"
        >
            <AppleLogo />
        </StyledButton>
    </LogosContainer>
);

PlayerListenOn.propTypes = {
    className: PropTypes.object,
};

export default memo(PlayerListenOn);
