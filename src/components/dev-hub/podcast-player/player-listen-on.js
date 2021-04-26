import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import AppleLogo from '~components/dev-hub/icons/audio-player/logos/apple-logo';
import Button from '~components/dev-hub/button';
import GoogleLogo from '~components/dev-hub/icons/audio-player/logos/google-logo';
import SpotifyLogo from '~components/dev-hub/icons/audio-player/logos/spotify-logo';

import { colorMap, size } from '~components/dev-hub/theme';

export const LogosContainer = styled('div')`
    align-items: center;
    display: flex;
    justify-content: center;
`;

const StyledButton = styled(Button)`
    margin-right: 30px;
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
`;

const PlayerListenOn = ({
    appleClick,
    className,
    googleClick,
    spotifyClick,
}) => (
    <LogosContainer className={className}>
        <StyledButton aria-label="google-podcasts" onClick={googleClick}>
            <GoogleLogo />
        </StyledButton>
        <StyledButton aria-label="spotify-podcasts" onClick={spotifyClick}>
            <SpotifyLogo />
        </StyledButton>
        <StyledButton aria-label="apple-podcasts" onClick={appleClick}>
            <AppleLogo />
        </StyledButton>
    </LogosContainer>
);

PlayerListenOn.propTypes = {
    appleClick: PropTypes.func,
    className: PropTypes.object,
    googleClick: PropTypes.func,
    spotifyClick: PropTypes.func,
};

export default memo(PlayerListenOn);
