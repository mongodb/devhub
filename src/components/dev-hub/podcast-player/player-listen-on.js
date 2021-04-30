import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Button from '~components/dev-hub/button';
import {
    AppleLogo,
    GoogleLogo,
    SpotifyLogo,
} from '~components/dev-hub/icons/audio-player';

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

const PlayerListenOn = ({ appleHref, className, googleHref, spotifyHref }) => (
    <LogosContainer className={className}>
        <StyledButton
            aria-label="google-podcasts"
            href={googleHref}
            target="_blank"
        >
            <GoogleLogo />
        </StyledButton>
        <StyledButton
            aria-label="spotify-podcasts"
            href={spotifyHref}
            target="_blank"
        >
            <SpotifyLogo />
        </StyledButton>
        <StyledButton
            aria-label="apple-podcasts"
            href={appleHref}
            target="_blank"
        >
            <AppleLogo />
        </StyledButton>
    </LogosContainer>
);

PlayerListenOn.propTypes = {
    appleHref: PropTypes.string,
    className: PropTypes.object,
    googleHref: PropTypes.string,
    spotifyHref: PropTypes.string,
};

export default memo(PlayerListenOn);
